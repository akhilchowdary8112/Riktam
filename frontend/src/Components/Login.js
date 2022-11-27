import React, { useState, useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Card, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../store/api";
import "antd/dist/antd.min.css";
import "./background.css";
function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  useEffect(() => {
    if (
      sessionStorage.getItem("username") !== null &&
      sessionStorage.getItem("type") !== null
    ) {
      if (sessionStorage.getItem("type") === "admin") {
        navigate("/admin/dashboard");
      }
      if (sessionStorage.getItem("type") === "user") {
        navigate("/user/dashboard");
      }
    }
  }, [navigate]);
  const onSubmit = async () => {
    try {
      let data = await login({ email: username, password: password });
      if (
        data.data.status === "Login Successfull" &&
        data.data.result[0].type === "admin"
      ) {
        message.info("Login Succesfull", 2);
        navigate("/admin/dashboard");
        sessionStorage.clear();
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("name", data.data.result[0].name);
        sessionStorage.setItem("type", data.data.result[0].type);
      } else if (
        data.data.status === "Login Successfull" &&
        data.data.result[0].type === "user"
      ) {
        message.info("Login Succesfull", 2);
        navigate("/user/dashboard");
        sessionStorage.clear();
        sessionStorage.setItem("type", data.data.result[0].type);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("name", data.data.result[0].name);
      }
    } catch (e) {
      message.error("Login failed try again", 2);
    }
  };
  const handleforgot = () => {
    navigate("/forgotpassword");
  };
  return (
    <div className="site">
      <br />
      <br />
      <br />
      <center>
        <Card bordered={true} style={{ width: 400 }} className="card">
          <form className="form-horizontal" style={{ textAlign: "center" }}>
            <h1>Login</h1>
            <Input
              type="text"
              value={username}
              placeholder="Email or Username"
              onChange={(e) => {
                setusername(e.target.value);
              }}
              style={{ width: "250px", height: "35px" }}
              suffix={<UserOutlined />}
            ></Input>{" "}
            <br />
            <br />
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              style={{ width: "250px", height: "35px" }}
              suffix={<LockOutlined />}
            ></Input>
            <br />
            <br />
            <Button
              type="primary"
              onClick={() => {
                onSubmit();
              }}
              size={"large"}
            >
              Login
            </Button>
            <br />
            <br />
            <span>Don't have an account? </span>
            &nbsp; &nbsp;
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                navigate("/registration");
              }}
            >
              <u>Sign Up</u>
            </span>
            <br />
            <br />
            <span
              onClick={handleforgot}
              style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
            >
              <u>Forgot Password?</u>
            </span>
            <br />
            <br />
          </form>
        </Card>
      </center>
    </div>
  );
}

export default Login;
