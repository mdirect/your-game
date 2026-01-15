import React from "react";
import styles from "./LoginForm.module.css";
import UserValidate from "../../entities/user/api/UserValidate";
import UserApi from "../../entities/user/api/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { useNavigate } from "react-router";

function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      const { isValid, error } = UserValidate.validateLoginData(formData);

      if (!isValid) return alert(error);
      const res = await UserApi.login(formData);

      setUser({ status: "logged", data: res.user });
      setAccessToken(res.accessToken);
      navigate(`/skeletpage`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Логин</div>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Введите e-mail"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Пароль</div>
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Введите пароль"
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          onClick={() => {
            navigate(`/skeletpage`);
          }}
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
