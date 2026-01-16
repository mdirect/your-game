import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import {
  createSession,
  fetchBoard,
  type BoardDto,
  type QuestionDto,
} from "../../entities/game/gameApi";
import { resetGameTimer, useGameTimer } from "../../shared/hooks/useGameTimer";
import {
  clearAnsweredCells,
  clearSessionStats,
  getSessionId,
  loadAnsweredCells,
  setTimeSeconds,
  setTotalQuestions,
  setSessionId,
} from "../../shared/lib/gameSessionStorage";

const COSTS = [100, 200, 300, 400, 500];
export default function MainPage() {
  const navigate = useNavigate();
  const [sessionId, setSessionIdState] = useState<string | null>(
    getSessionId()
  );
  const { remainingMs, isExpired, isPaused, togglePause } =
    useGameTimer(sessionId);
  const [board, setBoard] = useState<BoardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [answeredCells, setAnsweredCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchBoard()
      .then((data) => setBoard(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const existing = getSessionId();
    if (existing) {
      setSessionIdState(existing);
      setAnsweredCells(loadAnsweredCells(existing));
      return;
    }

    createSession()
      .then((session) => {
        setSessionId(session.id);
        setSessionIdState(String(session.id));
        resetGameTimer(session.id);
        clearAnsweredCells(String(session.id));
        clearSessionStats(String(session.id));
        setAnsweredCells(new Set());
      })
      .catch(() => {
        // если не смогли создать сессию — оставим текущую, если есть
        const fallback = getSessionId();
        setSessionIdState(fallback);
        if (fallback) {
          setAnsweredCells(loadAnsweredCells(fallback));
        }
      });
  }, []);

  useEffect(() => {
    if (sessionId) {
      setAnsweredCells(loadAnsweredCells(sessionId));
    }
  }, [sessionId]);

  useEffect(() => {
    if (!board || !sessionId) return;
    const totalQuestions = board.questions.length;
    if (totalQuestions > 0) {
      setTotalQuestions(sessionId, totalQuestions);
    }

    if (answeredCells.size >= totalQuestions && totalQuestions > 0) {
      const spentSeconds = Math.max(
        0,
        Math.round((20 * 60 * 1000 - remainingMs) / 1000)
      );
      setTimeSeconds(sessionId, spentSeconds);
      navigate("/result");
    }
  }, [board, sessionId, answeredCells, remainingMs, navigate]);

  // быстрый доступ к question по (themeId+cost)
  const qMap = useMemo(() => {
    const map = new Map<string, QuestionDto>();
    if (!board) return map;
    for (const q of board.questions) {
      map.set(`${q.themeId}:${q.cost}`, q);
    }
    return map;
  }, [board]);

  function handlePick(q: QuestionDto) {
    navigate(`/question/${q.themeId}/${q.cost}`);
  }

  function formatTime(ms: number) {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (loading) {
    // минимально: не падаем, показываем пустой экран/спиннер
    return (
      <div className="page">
        <div className="screen">Загрузка...</div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="page">
        <div className="screen">Ошибка загрузки доски</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="screen">
        <div className="gameHeader">
          <div />
          <div className="timerControls">
            <button
              className="timerBtn"
              type="button"
              onClick={togglePause}
              disabled={isExpired}
            >
              {isPaused ? "продолжить" : "пауза"}
            </button>
            <button className="timerBtn" type="button" disabled>
              {isExpired ? "время вышло" : `таймер ${formatTime(remainingMs)}`}
            </button>
          </div>
        </div>

        <div className="boardFrame">
          <div className="boardGrid">
            {board.themes.map((t) => (
              <div key={t.id} className="boardRow">
                <div className="themeCell">{t.title}</div>

                {COSTS.map((cost) => {
                  const q = qMap.get(`${t.id}:${cost}`);
                  const key = `${t.id}:${cost}`;
                  const disabled =
                    isExpired || !q || q.isAnswered || answeredCells.has(key);

                  return (
                    <button
                      key={`${t.id}-${cost}`}
                      className={`qCell ${disabled ? "disabled" : ""}`}
                      type="button"
                      disabled={disabled}
                      onClick={() => q && handlePick(q)}
                    >
                      {disabled ? "" : cost}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
