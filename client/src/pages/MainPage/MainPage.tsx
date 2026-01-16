import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import { fetchBoard, type BoardDto, type QuestionDto } from "../../entities/game/gameApi";
import { useGameTimer } from "../../shared/hooks/useGameTimer";

const COSTS = [100, 200, 300, 400, 500];
const ANSWERED_STORAGE_KEY = "answeredCells";

function loadAnsweredCells(): Set<string> {
  try {
    const raw = localStorage.getItem(ANSWERED_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
}

export default function MainPage() {
  const navigate = useNavigate();
  const { remainingMs, isExpired, isPaused, togglePause } = useGameTimer();
  const [board, setBoard] = useState<BoardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [answeredCells, setAnsweredCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchBoard()
      .then((data) => setBoard(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setAnsweredCells(loadAnsweredCells());
  }, []);

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
