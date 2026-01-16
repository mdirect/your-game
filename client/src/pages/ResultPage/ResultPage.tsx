import { useEffect, useState, type JSX } from "react";
import "./ResultPage.css";
import { fetchSessionById, type SessionDto } from "../../entities/game/gameApi";
import { getSessionId } from "../../shared/lib/gameSessionStorage";

type ResultPageProps = {
  playerName?: string;
  totalQuestions?: number;
  correctAnswers?: number;
  time?: number; // в секундах
  onRestart?: () => void;
};

export default function ResultPage({
  playerName,
  totalQuestions,
  correctAnswers,
  time,
  onRestart,
}: ResultPageProps): JSX.Element {
  const sessionId = getSessionId();
  const [session, setSession] = useState<SessionDto | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    fetchSessionById(sessionId)
      .then((data) => setSession(data))
      .catch(() => setSession(null));
  }, [sessionId]);

  const total = totalQuestions ?? session?.totalAnswers ?? 0;
  const correct = correctAnswers ?? session?.rigthQuestion ?? 0;
  const timeSeconds =
    time ??
    (session?.startTime && session?.endTime
      ? Math.max(
          0,
          Math.round(
            (new Date(session.endTime).getTime() -
              new Date(session.startTime).getTime()) /
              1000
          )
        )
      : 0);

  const percentage = total ? Math.round((correct / total) * 100) : 0;
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  return (
    <div className="result-page">
      <div className="result-card">
        <h1 className="result-title">Результат</h1>

        <div className="result-block">
          <div className="result-line">
            <span>Счет:</span>
            <strong>
              {correct}/{total}
            </strong>
          </div>
          <div className="result-line">
            <span>Процент:</span>
            <strong>{percentage}%</strong>
          </div>
        </div>

        <div className="result-divider" />

        <div className="result-block">
          <div className="result-line">
            <span>Игрок:</span>
            <strong>{playerName || "Игрок"}</strong>
          </div>
          <div className="result-line">
            <span>Вопросов:</span>
            <strong>{total}</strong>
          </div>
          <div className="result-line">
            <span>Правильных:</span>
            <strong>{correct}</strong>
          </div>
          <div className="result-line">
            <span>Время:</span>
            <strong>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </strong>
          </div>
        </div>

        <button
          className="result-restart"
          onClick={onRestart ?? (() => (window.location.href = "/"))}
        >
          Начать заново
        </button>
      </div>
    </div>
  );
}
