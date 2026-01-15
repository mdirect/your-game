import React from "react";
import { Outlet } from "react-router";
import Navigation from "../../widgets/Navigation/Navigation";
import Container from "react-bootstrap/Container";
import Footer from "../../widgets/Footer/Footer";

export default function Layout({ user, setUser }) {
  return (
    <div className="layout-container">
      <Navigation user={user} setUser={setUser} />
      <Container className="middle-of-page">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
