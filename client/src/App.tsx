import { useState, type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import PageAnswer from "./pages/pageAnswer/PageAnswer";

function App(): JSX.Element {
  const [currentQuestion] = useState<string>("Сколько будет 2+2?");
  const [isAnswerPageOpen, setIsAnswerPageOpen] = useState<boolean>(true);

  const handleSubmitAnswer = (answer: string): void => {
    console.log("Ответ пользователя:", answer);
    // Здесь можно добавить логику обработки ответа
    alert(`Ваш ответ: ${answer}`);
  };

  const handleCloseAnswer = (): void => {
    setIsAnswerPageOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
