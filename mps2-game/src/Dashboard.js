import React, { useState } from "react";
import "./Dashboard.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(number);

    const re = /^[0-9\b]+$/;

    if (number === "" || !re.test(number)) {
      console.log("say that you need to enter a number only");
    } else {
      navigate(`/game/${number}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Input onChange={(e) => setNumber(e.target.value)} />
        <br />
        <br />

        <Button onClick={handleSubmit} variant="contained">
          Contained
        </Button>
        <div>{number}</div>
      </div>
    </div>
  );
};

export default Dashboard;
