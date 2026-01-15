import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./app/Layout/Layout";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import SkeletPage from "./pages/SkeletPage";
import AccountPage from "./pages/AccountPage";
import axiosInstance, { setAccessToken } from "./shared/lib/axiosInstance";

function App() {
  const [user, setUser] = useState({ status: "logging", data: null });

  useEffect(() => {
    axiosInstance("/api/auth/refreshToken")
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={user} setUser={setUser} />}>
            <Route path="/" element={<MainPage user={user} />} />
            <Route path="/registery" element={<AuthPage setUser={setUser} />} />
            <Route path="/skeletpage" element={<SkeletPage user={user} />} />
            <Route
              path="/account"
              element={<AccountPage user={user} setUser={setUser} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
