import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import RaiseProblem from "./RaiseProblem";
import { Nav, Navbar } from "react-bootstrap";
import { Tooltip } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchproblemsas } from "../../store/slices/index";
function Dashboard({ value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disp, setdisp] = useState(1);
  const data = useSelector((state) => state.User);
  const [getdata, setgetdata] = useState(true);
  useEffect(() => {
    if (getdata) {
      dispatch(fetchproblemsas());
      setgetdata(false);
    }
  }, [dispatch, getdata]);
  useEffect(() => {
    if (value === "Home") {
      setdisp(1);
      navigate("/user/dashboard");
    } else if (value === "Raise") {
      setdisp(2);
      navigate("/user/raise-a-problem");
    }
  }, [value]);
  return (
    <>
      <div style={{ margin: "0" }}>
        <Navbar
          style={{
            width: "100%",
            height: "50px",
            position: "fixed",
            zIndex: "1",
            backgroundColor: "#0050EF",
          }}
        >
          <Nav>
            <Nav.Link
              onClick={() => {
                setdisp(1);
                navigate("/user/dashboard");
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
                navigate("/user/raise-a-problem");
              }}
            >
              <b style={{ color: "white", fontSize: "15px" }}>Raise Issues</b>
            </Nav.Link>
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
      <div>
        <br />
        <br />
        <br />
        
        {disp === 1 && <Home />}
        {disp === 2 && <RaiseProblem />}
      </div>
    </>
  );
}
export default Dashboard;
