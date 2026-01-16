import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";
import UserApi from "../../entities/user/api/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
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
      const data = await UserApi.signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }

      navigate("/game");
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: unknown };
        message?: string;
      };
      const message =
        maybeErr?.response?.data ??
        maybeErr?.message ??
        "Не удалось зарегистрироваться";
      setError(String(message));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Регистрация</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-field">
            <span>Имя</span>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              autoComplete="name"
              required
            />
          </label>

          <label className="register-field">
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

          <label className="register-field">
            <span>Пароль</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              autoComplete="new-password"
              required
            />
          </label>

          {error && <div className="register-error">{error}</div>}

          <button
            className="register-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Создаём аккаунт..." : "Зарегистрироваться"}
          </button>
          <button
            className="register-link"
            type="button"
            onClick={() => navigate("/login")}
          >
            Уже есть аккаунт? Войти
          </button>
        </form>
      </div>
    </div>
  );
}
