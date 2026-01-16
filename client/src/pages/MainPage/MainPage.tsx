import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
import { fetchBoard, type BoardDto, type QuestionDto } from "../../entities/game/gameApi";

const COSTS = [100, 200, 300, 400, 500];

export default function MainPage() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoard()
      .then((data) => setBoard(data))
      .finally(() => setLoading(false));
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

  function handleTimerClick() {
    console.log("timer");
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
          <button className="timerBtn" type="button" onClick={handleTimerClick}>
            таймер
          </button>
        </div>

        <div className="boardFrame">
          <div className="boardGrid">
            {board.themes.map((t) => (
              <div key={t.id} className="boardRow">
                <div className="themeCell">{t.title}</div>

                {COSTS.map((cost) => {
                  const q = qMap.get(`${t.id}:${cost}`);
                  const disabled = !q || q.isAnswered;

                  return (
                    <button
                      key={`${t.id}-${cost}`}
                      className={`qCell ${disabled ? "disabled" : ""}`}
                      type="button"
                      disabled={disabled}
                      onClick={() => q && handlePick(q)}
                    >
                      {cost}
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
