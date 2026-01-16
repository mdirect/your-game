import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./app/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/game" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
