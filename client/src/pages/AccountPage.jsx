import { LogOut, UserPen } from "lucide-react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import UserApi from "../entities/user/api/UserApi";
import EditUserForm from "../features/EditUserForm/EditUserForm";
import Loader from "../shared/hocs/Loader";

export default function AccountPage({ user, setUser }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logoutHandler = async () => {
    try {
      await UserApi.logout();
      setUser({ status: "guest", data: null });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader isLoading={!user.data}>
        {show ? (
          <EditUserForm setUser={setUser} />
        ) : (
          <Card className="account_card">
            <Col className="mb-8">Имя: {user?.data?.name}</Col>
            <Col className="mb-8">E-mail: {user?.data?.email}</Col>
            <Col className="mb-4">
              <button
                className="account_button"
                onClick={() => setShow((prev) => !prev)}
              >
                <UserPen />
              </button>
              <button className="account_button" onClick={logoutHandler}>
                <LogOut />
              </button>
            </Col>
          </Card>
        )}
      </Loader>
    </>
  );
}
