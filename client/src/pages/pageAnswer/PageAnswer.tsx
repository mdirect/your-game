import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PageAnswer.css";
import { fetchQuestionByThemeAndCost } from "../../entities/game/gameApi";
import { useGameTimer } from "../../shared/hooks/useGameTimer";

const ANSWERED_STORAGE_KEY = "answeredCells";

function markAnsweredCell(themesId: number, cost: number) {
  try {
    const raw = localStorage.getItem(ANSWERED_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(parsed) ? parsed : [];
    const key = `${themesId}:${cost}`;
    const next = Array.from(new Set([...list, key]));
    localStorage.setItem(ANSWERED_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors
  }
}

type QuestionState = {
  question: string;
  answer: string;
};

export default function PageAnswer() {
  const navigate = useNavigate();
  const { themesId, cost } = useParams();
  const { remainingMs, isExpired } = useGameTimer();
  const [answer, setAnswer] = useState<string>("");
  const [questionState, setQuestionState] = useState<QuestionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (isExpired) {
      setError("Время вышло");
      setLoading(false);
      return;
    }
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
        setQuestionState({ question: data.question, answer: data.answer });
      })
      .catch(() => setError("Ошибка загрузки вопроса"))
      .finally(() => setLoading(false));
  }, [themesId, cost, isExpired]);

  const handleSubmit = (): void => {
    if (!answer.trim()) return;
    if (!questionState) return;

    if (themesId && cost) {
      markAnsweredCell(Number(themesId), Number(cost));
    }

    const normalized = answer.trim().toLowerCase();
    const correct = questionState.answer.trim().toLowerCase();
    setIsCorrect(normalized === correct);
    setIsSubmitted(true);
  };

  return (
    <div className="answer-page">
      <div className="answer-card">
        <h2 className="answer-title">Вопрос</h2>
        <div className="answer-timer">
          {isExpired ? "Время вышло" : `Осталось ${Math.ceil(remainingMs / 1000)} сек`}
        </div>

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
          disabled={loading || Boolean(error) || isSubmitted}
        />

        {isSubmitted && questionState && (
          <div className={`answer-result ${isCorrect ? "ok" : "fail"}`}>
            {isCorrect ? "Правильно!" : `Неверно. Правильный ответ: ${questionState.answer}`}
          </div>
        )}

        <div className="answer-actions">
          <button
            className="answer-submit"
            type="button"
            onClick={handleSubmit}
            disabled={loading || Boolean(error) || isSubmitted}
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
