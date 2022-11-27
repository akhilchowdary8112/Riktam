import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Card, Button, Select, message } from "antd";
import { login, updateuserpassword } from "../store/api";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./background.css";
export default function ForgotPassword() {
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const [p, p1] = useState("");
  const [cp, cp1] = useState("");
  const [answer, setanswer] = useState("");
  const [disp, setdisp] = useState(0);
  const [data, setdata] = useState();
  const onSubmite = async () => {
    let res;
    try {
      res = await login({ email: username });
    } catch (e) {
      message.error("Something went wrong", 2);
      return;
    }
    if (res) {
      setdata(res.data.result[0]);
      setdisp(1);
    }
  };
  const onvalidatesecurityquestion = async () => {
    if (answer === data.answer) {
      setdisp(2);
    }
  };
  const updatepassword = async () => {
    let d = await updateuserpassword({ password: p, _id: data._id });
    if (d.data.message === "Password Updated successfully") {
      message.info("Password Updated Succesfully", 2);
      navigate("/");
    }
  };
  return (
    <div>
      <div className="site">
        <center>
          <Card
            title="Forgot Password"
            bordered={true}
            style={{ width: 400, marginTop: "100px" }}
          >
            {disp === 0 && (
              <>
                <Input
                  type="email"
                  value={username}
                  placeholder="Email or Username"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  style={{ width: "250px", height: "35px" }}
                  suffix={<UserOutlined />}
                ></Input>
                <br />
                <br />
                <Button
                  type="primary"
                  size={"large"}
                  onClick={() => {
                    onSubmite();
                  }}
                >
                  submit
                </Button>
              </>
            )}
            {disp === 1 && (
              <>
                <Select
                  defaultValue={data.securityquestion}
                  disabled
                  style={{ width: 250 }}
                ></Select>
                <br />
                <br />
                <Input
                  type="text"
                  value={answer}
                  placeholder="Your Answer"
                  onChange={(e) => {
                    setanswer(e.target.value);
                  }}
                  style={{ width: "250px", height: "35px" }}
                ></Input>
                <br />
                <br />
                <Button
                  type="primary"
                  size={"large"}
                  onClick={() => {
                    onvalidatesecurityquestion();
                  }}
                >
                  submit
                </Button>
              </>
            )}
            {disp === 2 && (
              <>
                <Input
                  type="password"
                  value={p}
                  placeholder="Password"
                  maxLength={8}
                  onChange={(e) => {
                    p1(e.target.value);
                  }}
                  style={{ width: "250px", height: "35px" }}
                  suffix={<LockOutlined />}
                ></Input>
                <br />
                <br />
                <Input
                  type="password"
                  value={cp}
                  maxLength={8}
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    cp1(e.target.value);
                  }}
                  style={{ width: "250px", height: "35px" }}
                  suffix={<LockOutlined />}
                ></Input>
                <br />
                <br />
                <Button
                  type="primary"
                  size={"large"}
                  onClick={() => {
                    updatepassword();
                  }}
                >
                  submit
                </Button>
              </>
            )}
          </Card>
        </center>
      </div>
    </div>
  );
}
