import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import firebase from "./config/auth";
import Dashboard from "./Dashboard";
import UniqueGame from "./components/UniqueGame";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="dashboard" element={<Dashboard user={user} />} />
          <Route exact path="login" element={<Login setUser={setUser}/>} />
          <Route exact path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/game/:id" element={<UniqueGame user={user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
