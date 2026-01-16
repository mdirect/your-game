import { useMemo } from "react";
import "./mainPage.css";

type Theme = { id: number; title: string };

type QuestionCell = {
  id: number;
  themeId: number;
  cost: number;
  isAnswered: boolean;
};

const COSTS = [200, 400, 600, 800, 1000];

export default function MainPage() {
  const data = useMemo(() => {
    const themes: Theme[] = [
      { id: 1, title: "ТЕМА 1" },
      { id: 2, title: "ТЕМА 2" },
      { id: 3, title: "ТЕМА 3" },
      { id: 4, title: "ТЕМА 4" },
      { id: 5, title: "ТЕМА 5" },
      { id: 6, title: "ТЕМА 6" },
    ];

    const questions: QuestionCell[] = themes.flatMap((t) =>
        COSTS.map((cost) => ({
          id: Number(`${t.id}${cost}`),
          themeId: t.id,
          cost,
          isAnswered: false, // TODO BACKEND: брать из answersSession / session state
        }))
      );
  
      return { themes, questions };
    }, []);
  
    function handlePick(q: QuestionCell) {
      // TODO ROUTER: navigate(`/question/${q.id}`)
      console.log("pick:", q);
    }
  
    function handleTimerClick() {
      // TODO TIMER: открыть модалку/запуск отсчета
      console.log("timer");
    }
  
    return (
      <div className="page">
        <div className="screen">
          {/* таймер справа сверху от игрового поля */}
          <div className="gameHeader">
            <div />
            <button className="timerBtn" type="button" onClick={handleTimerClick}>
              таймер
            </button>
          </div>
  
          <div className="boardFrame">
            <div className="boardGrid">
              {data.themes.map((t) => (
                <div key={t.id} className="boardRow">
                  <div className="themeCell">{t.title}</div>
  
                  {COSTS.map((cost) => {
                    const q = data.questions.find(
                      (qq) => qq.themeId === t.id && qq.cost === cost
                    );
  
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