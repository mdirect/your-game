import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PageAnswer.css";
import { fetchQuestionByThemeAndCost } from "../../entities/game/gameApi";

type QuestionState = {
  question: string;
};

export default function PageAnswer() {
  const navigate = useNavigate();
  const { themesId, cost } = useParams();
  const [answer, setAnswer] = useState<string>("");
  const [questionState, setQuestionState] = useState<QuestionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themesId || !cost) {
      setError("Некорректные параметры вопроса");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchQuestionByThemeAndCost(Number(themesId), Number(cost))
      .then((data) => {
        if (!data) {
          setError("Вопрос не найден");
          return;
        }
        setQuestionState({ question: data.question });
      })
      .catch(() => setError("Ошибка загрузки вопроса"))
      .finally(() => setLoading(false));
  }, [themesId, cost]);

  const handleSubmit = (): void => {
    if (!answer.trim()) return;
    console.log("answer:", answer);
    setAnswer("");
    navigate("/game");
  };

  return (
    <div className="answer-page">
      <div className="answer-card">
        <h2 className="answer-title">Вопрос</h2>

        <div className="answer-question">
          {loading && "Загрузка вопроса..."}
          {!loading && error && error}
          {!loading && !error && questionState?.question}
        </div>

        <input
          className="answer-input"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Введите ответ"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          disabled={loading || Boolean(error)}
        />

        <div className="answer-actions">
          <button
            className="answer-submit"
            type="button"
            onClick={handleSubmit}
            disabled={loading || Boolean(error)}
          >
            Ответить
          </button>
          <button className="answer-cancel" type="button" onClick={() => navigate("/game")}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}
