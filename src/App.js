import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SetPasssword from "./pages/SetPasssword";

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
            path="/set-password/:setPasswordId"
            element={<SetPasssword />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
