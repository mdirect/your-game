import React from "react";
import styles from "./EditUserForm.module.css";
import axiosInstance, { setAccessToken } from "../../shared/lib/axiosInstance";
import { useNavigate } from "react-router";

function EditUserForm({ setUser }) {
  const navigate = useNavigate();

  const changeInfoHandler = async (event) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      const name = formData.name;
      if (!name) return alert("Заполните все поля");
      const { data } = await axiosInstance.patch("/api/user", { name });
      console.log(data);

      setUser({ data: data.user });
      setAccessToken(data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={changeInfoHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Имя</div>
          <input
            className={styles.input}
            name="name"
            type="name"
            placeholder="Введите новое имя"
            required
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={() => {
            navigate(`/account`);
          }}
        >
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default EditUserForm;
