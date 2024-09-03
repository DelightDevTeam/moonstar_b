import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(name, password);
  };

  return (
    <div className="pt-4 pb-5 ">
      <div className="customForm rounded-4 p-4 pb-5 mb-5">
        <div className="text-center">
          <img src={logo} className="logo" />
        </div>
        <h3 className="gradient-text mb-4 fw-bold text-center">
          Welcome to M9
        </h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label className=" fw-semibold">Login Name</Form.Label>
            <Form.Control
              className="rounded-5 p-2"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {error && <span className="text-danger">*{error.user_name}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className=" fw-semibold">Password</Form.Label>
            <Form.Control
              className="rounded-5 p-2"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {error && <span className="text-danger">*{error.password}</span>}
          </Form.Group>
          <button
            type="submit"
            className="d-flex align-items-center justify-content-center bg-gradient rounded-4 py-2 fw-semibold px-5 w-full text-center"
          >
          {loading && <Spinner size="sm" className="me-2" />}
            <h5 className="m-0  py-1">Login</h5>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
