import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Registration from "./Components/Registration";
import AdminDashboard from "./Components/Admin/Dashboard";
import UserDashboard from "./Components/Users/Dashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard value="Home" />}
          ></Route>
          <Route
            path="/admin/raise-a-problem"
            element={<AdminDashboard value="Raise" />}
          ></Route>
          <Route
            path="/admin/response"
            element={<AdminDashboard value="Solve" />}
          ></Route>
          <Route
            path="/user/dashboard"
            element={<UserDashboard value="Home" />}
          ></Route>
          <Route
            path="/user/raise-a-problem"
            element={<UserDashboard value="Raise" />}
          ></Route>
          <Route
            path="/user/response"
            element={<UserDashboard value="Solve" />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
