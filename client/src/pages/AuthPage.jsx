import React, { useState } from "react";
import SignUpForm from "../features/SignUpForm/SignUpForm";
import LoginForm from "../features/LoginForm/LoginForm";
import { Button } from "react-bootstrap";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div>
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
        <Button className="button_registry" onClick={() => setShowLogin((prev) => !prev)}>
          {showLogin ? "Зарегистрироваться" : "<< Назад"}
        </Button>
      </div>
    </>
  );
}
