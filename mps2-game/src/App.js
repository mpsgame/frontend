import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import firebase from "./config/auth";
import Header from "./Header";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="dashboard" element={<Dashboard />} />

          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
