import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./app/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PageAnswer from "./pages/pageAnswer/PageAnswer";
import ResultPage from "./pages/ResultPage/ResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/game" element={<MainPage />} />
          <Route path="/question/:themesId/:cost" element={<PageAnswer />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
