import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SetPasssword from "./pages/SetPasssword";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import TaskCategories from "./pages/admin/TaskCategories";
import Projects from "./pages/admin/Projects";
import UserDashboard from "./pages/user/UserDashboard";
import Project from "./pages/user/Project";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/activate-account/:activateId"
            element={<SetPasssword />}
          />
          <Route
            path="/reset-password/:setPasswordId"
            element={<SetPasssword />}
          />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/task-categories" element={<TaskCategories />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/project/:projectId" element={<Project />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
