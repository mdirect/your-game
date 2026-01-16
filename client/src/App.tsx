import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./app/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/game" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
