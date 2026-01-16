import { useState, type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import PageAnswer from "./pages/pageAnswer/PageAnswer";
import ResultPage from "./pages/ResultPage/ResultPage";

function App(): JSX.Element {
  const [currentQuestion] = useState<string>("Сколько будет 2+2?");
  const [isAnswerPageOpen, setIsAnswerPageOpen] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSubmitAnswer = (answer: string): void => {
    console.log("Ответ пользователя:", answer);
    // Здесь можно добавить логику обработки ответа
    alert(`Ваш ответ: ${answer}`);
    setShowResult(true);
  };

  const handleCloseAnswer = (): void => {
    setIsAnswerPageOpen(false);
  };

  const handleRestart = (): void => {
    setShowResult(false);
    setIsAnswerPageOpen(true);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              showResult ? (
                <ResultPage
                  playerName="Алексей"
                  totalQuestions={10}
                  correctAnswers={7}
                  time={185}
                  onRestart={handleRestart}
                />
              ) : (
                <PageAnswer
                  question={currentQuestion}
                  isOpen={isAnswerPageOpen}
                  onSubmit={handleSubmitAnswer}
                  onClose={handleCloseAnswer}
                />
              )
            }
          />
          <Route
            path="/answer"
            element={
              <PageAnswer
                question={currentQuestion}
                isOpen={isAnswerPageOpen}
                onSubmit={handleSubmitAnswer}
                onClose={handleCloseAnswer}
              />
            }
          />
          <Route
            path="/result"
            element={
              <ResultPage
                playerName="Алексей"
                totalQuestions={10}
                correctAnswers={7}
                time={185}
                onRestart={handleRestart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
