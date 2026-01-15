import React from "react";

export default function MainPage({ user }) {
  return (
    <>
      <div className="main_greeting">
        <div>
          <img
            className="main_img"
            alt="Скелет с дельфином"
            src="/title_skelet.png"
          />
        </div>
        <div className="main_text">
          <h2>
            Добро пожаловать
            {user.status === "logged" ? `, ${user.data?.name}!` : `!`}
          </h2>
          <p>
            <span>Skelet</span> — разберем ваш код по косточкам!
          </p>
        </div>
      </div>
    </>
  );
}
