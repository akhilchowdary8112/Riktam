import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import RaiseProblem from "./RaiseProblem";
import { Nav, Navbar } from "react-bootstrap";
import { Tooltip, Spin } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchproblemsas } from "../../store/slices";
function Dashboard({ value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getdata, setdata] = useState(true);
  const [disp, setdisp] = useState(1);
  const data = useSelector((state) => state.User);
  useEffect(() => {
    if (getdata) {
      setdata(false);
      dispatch(fetchproblemsas());
    }
  }, [getdata, dispatch]);

  useEffect(() => {
    if (value === "Home") {
      setdisp(1);
      navigate("/admin/dashboard");
    } else if (value === "Raise") {
      setdisp(2);
      navigate("/admin/raise-a-problem");
    }
  }, [value]);
  return (
    <>
      <div style={{ margin: "0" }}>
        <Navbar
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#0050EF",
          }}
        >
          <Nav>
            <Nav.Link
              onClick={() => {
                setdisp(1);
                navigate("/admin/dashboard");
              }}
            >
              <b
                style={{
                  color: "white",
                  fontSize: "15px",
                  margin: "10px",
                }}
              >
                Home
              </b>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
            <Nav.Link
              onClick={() => {
                setdisp(2);
                navigate("/admin/raise-a-problem");
              }}
            >
              <b style={{ color: "white", fontSize: "15px" }}>Raise problems</b>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
            <Nav.Link
              style={{ float: "right" }}
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
            >
              <Tooltip title={"Logout"}>
                <PoweroffOutlined
                  style={{
                    color: "white",
                    fontSize: "200%",
                  }}
                />
              </Tooltip>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
      {data.adminvalue >= 1 ? (
        <div style={{ margin: "40px" }}>
          {disp === 1 && <Home />}
          {disp === 2 && <RaiseProblem />}
        </div>
      ) : (
        <Spin
          tip="Loading"
          spinning={data.adminvalue === 0}
          style={{ marginTop: "10%", marginLeft: "40%" }}
        ></Spin>
      )}
    </>
  );
}
export default Dashboard;
