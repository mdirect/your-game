import { useState, type JSX } from "react";

type QuestionModalProps = {
  question: string;
  isOpen: boolean;
  onSubmit: (answer: string) => void;
  onClose: () => void;
};

export default function PageAnswer({
  question,
  isOpen,
  onSubmit,
  onClose,
}: QuestionModalProps): JSX.Element | null {
  const [answer, setAnswer] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (): void => {
    if (!answer.trim()) return;
    onSubmit(answer);
    setAnswer("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80">
      <div className="w-full max-w-md rounded-3xl border-4 border-cyan-400 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl shadow-cyan-500/50">
        <h2 className="mb-6 text-center text-3xl font-bold text-cyan-300">
          ❓ Вопрос
        </h2>

        <div className="mb-8 rounded-2xl border-2 border-cyan-400/50 bg-slate-800/80 p-6 backdrop-blur-sm">
          <p className="text-center text-lg font-semibold text-cyan-100">
            {question}
          </p>
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Введите ответ"
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="mb-6 w-full rounded-xl border-2 border-cyan-400/50 bg-slate-700 px-4 py-3 text-cyan-100 placeholder-cyan-400/60 transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl border-2 border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-bold text-slate-900 shadow-lg shadow-cyan-500/50 transition hover:border-cyan-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl hover:shadow-cyan-400/50 active:scale-95"
          >
            Ответить
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-cyan-400/50 bg-slate-700/70 px-4 py-3 font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-slate-700 hover:text-cyan-200 active:scale-95"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
