import { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PageAnswer.css";
import {
  createAnswerSession,
  createSession,
  fetchQuestionByThemeAndCost,
  updateAnswerSession,
} from "../../entities/game/gameApi";
import { resetGameTimer, useGameTimer } from "../../shared/hooks/useGameTimer";
import {
  getSessionId,
  markAnsweredCell,
  recordAnswer,
  setSessionId,
} from "../../shared/lib/gameSessionStorage";

type QuestionState = {
  question: string;
  answer: string;
  questionId: number;
};

export default function PageAnswer(): JSX.Element {
  const navigate = useNavigate();
  const { themesId, cost } = useParams();
  const [sessionId, setSessionIdState] = useState<string | null>(
    getSessionId()
  );
  const { remainingMs, isExpired } = useGameTimer(sessionId);
  const [answer, setAnswer] = useState<string>("");
  const [questionState, setQuestionState] = useState<QuestionState | null>(
    null
  );
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

    const loadSession = sessionId
      ? Promise.resolve(sessionId)
      : createSession()
          .then((session) => {
            setSessionId(session.id);
            setSessionIdState(String(session.id));
            resetGameTimer(session.id);
            return String(session.id);
          })
          .catch(() => {
            setError("Не удалось создать сессию");
            return null;
          });

    loadSession
      .then((currentSessionId) => {
        if (!currentSessionId) return null;
        return fetchQuestionByThemeAndCost(Number(themesId), Number(cost));
      })
      .then((data) => {
        if (!data) {
          setError("Вопрос не найден");
          return;
        }
        setQuestionState({
          question: data.question,
          answer: data.answer,
          questionId: data.id,
        });
      })
      .catch(() => setError("Ошибка загрузки вопроса"))
      .finally(() => setLoading(false));
  }, [themesId, cost, isExpired]);

  async function handleSubmit() {
    if (!answer.trim()) return;
    if (!questionState) return;
    if (!sessionId) {
      setError("Сессия не найдена");
      return;
    }

    try {
      const created = await createAnswerSession(
        Number(sessionId),
        questionState.questionId
      );
      await updateAnswerSession(created.id, answer.trim());
    } catch (_) {
      // даже если бек упал — отмечаем локально
    }

    if (themesId && cost) {
      markAnsweredCell(sessionId, Number(themesId), Number(cost));
    }

    const normalized = answer.trim().toLowerCase();
    const correct = questionState.answer.trim().toLowerCase();
    const success = normalized === correct;
    recordAnswer(sessionId, success);
    setIsCorrect(success);
    setIsSubmitted(true);
  }

  return (
    <div className="answer-page">
      <div className="answer-card">
        <h2 className="answer-title">Вопрос</h2>
        <div className="answer-timer">
          {isExpired
            ? "Время вышло"
            : `Осталось ${Math.ceil(remainingMs / 1000)} сек`}
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
            {isCorrect
              ? "Правильно!"
              : `Неверно. Правильный ответ: ${questionState.answer}`}
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
          <button
            className="answer-cancel"
            type="button"
            onClick={() => navigate("/game")}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}
