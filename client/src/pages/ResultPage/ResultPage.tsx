import { type JSX } from "react";

type ResultPageProps = {
  playerName: string;
  totalQuestions: number;
  correctAnswers: number;
  time: number; // в секундах
  onRestart: () => void;
};

export default function ResultPage({
  playerName,
  totalQuestions,
  correctAnswers,
  time,
  onRestart,
}: ResultPageProps): JSX.Element {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80">
      <div className="w-full max-w-md rounded-3xl border-4 border-cyan-400 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl shadow-cyan-500/50">
        <h1 className="mb-8 text-center text-4xl font-bold text-cyan-300">
          🎉 Результат
        </h1>

        <div className="mb-8 rounded-2xl border-2 border-cyan-400/50 bg-slate-800/80 p-6 backdrop-blur-sm">
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-cyan-200">Счет:</span>
              <span className="text-2xl font-bold text-cyan-300">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-700">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyan-200">Процент:</span>
              <span className="text-xl font-bold text-cyan-300">
                {percentage}%
              </span>
            </div>

            <hr className="border-cyan-400/20" />

            <div className="flex items-center justify-between">
              <span className="text-cyan-200">Игрок:</span>
              <span className="text-lg font-semibold text-cyan-100">
                {playerName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyan-200">Вопросов:</span>
              <span className="text-lg font-semibold text-cyan-100">
                {totalQuestions}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyan-200">Правильных:</span>
              <span className="text-lg font-semibold text-cyan-100">
                {correctAnswers}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-cyan-200">Время:</span>
              <span className="text-lg font-semibold text-cyan-100">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full rounded-xl border-2 border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xl font-bold text-slate-900 shadow-lg shadow-cyan-500/50 transition hover:border-cyan-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl hover:shadow-cyan-400/50 active:scale-95"
        >
          Начать заново
        </button>
      </div>
    </div>
  );
}
