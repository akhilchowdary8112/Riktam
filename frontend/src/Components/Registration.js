import React, { useState } from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Input, Card, Button, Select, message } from "antd";
import { signup } from "../store/api/index";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./background.css";
export default function Registration() {
  const { Option } = Select;
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [password1, setpassword1] = useState("");
  const [name, setname] = useState("");
  const [q, setq] = useState("");
  const [ans, setans] = useState("");
  const [usertype, setusertype] = useState("");
  const onsubmit = async () => {
    if (name === "") {
      message.warning("Fill Full Name", 1);
      return;
    }
    if (username === "") {
      message.warning("Fill Email", 1);
      return;
    }
    if (password !== password1 || password.length < 8) {
      if (password.length < 8) {
        message.warning("Password must be length of 8", 1);
      } else {
        message.warning("Password and Confirm Password are not matched", 1);
      }
      return;
    }
    if (usertype === "") {
      message.warning("Select User Type", 1);
      return;
    }
    if (q === "") {
      message.warning("Select Question", 1);
      return;
    }
    if (ans === "") {
      message.warning("Answer Required", 1);
      return;
    }
    let data = await signup({
      name,
      email: username,
      password,
      securityquestion: q,
      answer: ans,
      type: usertype,
    });
    if (data.data.message === "User created successfully") {
      message.info("User Created Successfully", 2);
      navigate("/");
    } else if (data.data.message === "error") {
      message.warning("User Already Registered", 2);
    }
    if (!data) {
      message.warning("Something Went Wrong", 1);
    }
  };
  return (
    <div className="site">
      <center>
        <Card
          title="Registration"
          bordered={true}
          style={{ width: 400, marginTop: "15px" }}
        >
          <Input
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            style={{ width: "250px", height: "35px" }}
            suffix={<UserOutlined />}
          ></Input>
          <br />
          <br />
          <Input
            type="email"
            value={username}
            placeholder="Email"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            style={{ width: "250px", height: "35px" }}
            suffix={<MailOutlined />}
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
          <Input
            type="password"
            value={password1}
            placeholder="Confirm Password"
            onChange={(e) => {
              setpassword1(e.target.value);
            }}
            style={{ width: "250px", height: "35px" }}
            suffix={<LockOutlined />}
          ></Input>
          <br />
          <br />
          <Select
            defaultValue="Select User Type"
            style={{ width: 250 }}
            onChange={(e) => {
              setusertype(e);
            }}
          >
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
          <br />
          <br />
          <Select
            defaultValue="Select Security Question"
            style={{ width: 250 }}
            onChange={(e) => {
              setq(e);
            }}
          >
            <Option value="What is your birth place">
              What is your birth place
            </Option>
            <Option value="What is your first school">
              What is your first school
            </Option>
            <Option value="What is your pet name">What is your pet name</Option>
            <Option value="Which is your favourite place">
              Which is your favourite place
            </Option>
            <Option value="Which is your favourite sport">
              Which is your favourite sport
            </Option>
          </Select>
          <br />
          <br />
          <Input
            type="text"
            value={ans}
            placeholder="Type your answer"
            style={{ width: "250px", height: "35px" }}
            onChange={(e) => {
              setans(e.target.value);
            }}
          ></Input>
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => {
              onsubmit();
            }}
            size={"large"}
          >
            submit
          </Button>
          <br />
        </Card>
      </center>
    </div>
  );
}
