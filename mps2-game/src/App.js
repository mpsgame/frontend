import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import firebase from "./config/auth";
import Dashboard from "./Dashboard";
import UniqueGame from "./components/UniqueGame";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/game/:id" element={<UniqueGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
