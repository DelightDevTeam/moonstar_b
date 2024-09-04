import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import mm_data from "../lang/mm";
import en_data from "../lang/en";

const LoginPage = () => {
  const auth = localStorage.getItem("token");
  const lan = localStorage.getItem("lan");
  // console.log(lan);
  
  let navigate = useNavigate();
  useEffect(() => {
    if(auth){
      navigate('/');
    }
  }, [auth, navigate]);

  const [content, setContent] = useState({});
  useEffect(() => {
    if (lan == "mm") {
      setContent(mm_data)
    }else{
      setContent(en_data)
    }
  }, [lan])
  
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
        <h5 className="gradient-text my-4 fw-bold text-center">
          {content.auth?.welcome}
        </h5>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label className=" fw-semibold">{content.auth?.user_name}</Form.Label>
            <Form.Control
              className="rounded-5 p-2"
              type="text"
              placeholder={content.auth?.enter_user_name}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {error && <span className="text-danger">*{error.user_name}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className=" fw-semibold">{content.auth?.password}</Form.Label>
            <Form.Control
              className="rounded-5 p-2"
              type="password"
              placeholder={content.auth?.enter_password}
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
            <h5 className="m-0  py-1">{content.auth?.login}</h5>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
