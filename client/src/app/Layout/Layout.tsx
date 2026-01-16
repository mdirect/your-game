import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navigation from "../../widgets/Navigation/Navigation";
import axiosInstance, { setAccessToken } from "../../shared/lib/axiosInstance";

type User = {
  id: number;
  name?: string;
  email?: string;
};

export default function Layout() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const userName = user?.name || user?.email || "Name";

  useEffect(() => {
    // берем accessToken и user с refresh (как у тебя было в App)
    axiosInstance("/api/auth/refreshToken")
      .then(({ data }) => {
        // ожидаем: { accessToken, user }
        if (data?.accessToken) setAccessToken(data.accessToken);
        if (data?.user) setUser(data.user);
      })
      .catch(() => {
        setAccessToken("");
        setUser(null);
        // TODO: если хочешь — редирект на /auth
        // navigate("/auth");
      });
  }, []);

  async function handleLogout() {
    try {
      // TODO BACKEND: если у вас другой урл — поменять тут
      await axiosInstance.post("/api/auth/logout");
    } catch (_) {
      // даже если бек упал — локально чистим
    } finally {
      setAccessToken("");
      setUser(null);
      navigate("/register");
    }
  }

  return (
    <div className="layout-container">
      <Navigation userName={userName} onLogout={handleLogout} />
      <main className="layout-full">
        <Outlet />
      </main>
    </div>
  );
}
