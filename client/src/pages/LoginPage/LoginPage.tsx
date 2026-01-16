import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import UserApi from "../../entities/user/api/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import {
  clearAnsweredCells,
  clearSessionId,
  getSessionId,
} from "../../shared/lib/gameSessionStorage";
import { resetGameTimer } from "../../shared/hooks/useGameTimer";

type FormState = {
  email: string;
  password: string;
};

const INITIAL_STATE: FormState = {
  email: "",
  password: "",
};
export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);
      const data = await UserApi.login({
        email: form.email.trim(),
        password: form.password,
      });

      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }

      const existingSessionId = getSessionId();
      if (existingSessionId) {
        clearAnsweredCells(existingSessionId);
        resetGameTimer(existingSessionId);
      }
      clearSessionId();

      navigate("/game");
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: unknown };
        message?: string;
      };
      const message =
        maybeErr?.response?.data ?? maybeErr?.message ?? "Не удалось войти";
      setError(String(message));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Вход</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="login-field">
            <span>Пароль</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div className="login-error">{error}</div>}
          <button
            className="login-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
