import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./app/Layout/Layout";
import MainPage from "../src/pages/MainPage/MainPage";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage";
import LoginPage from "../../client/src/pages/LoginPage/LoginPage";
import PageAnswer from "./pages/pageAnswer/PageAnswer";
import ResultPage from "./pages/ResultPage/ResultPage";
import { JSX } from "react";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game" element={<Layout />} />
          <Route path="/answer/:themesId/:cost" element={<PageAnswer />} />
          <Route
            path="/result"
            element={
              <ResultPage
                playerName="Игрок"
                totalQuestions={10}
                correctAnswers={7}
                time={185}
                onRestart={() => (window.location.href = "/")}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
