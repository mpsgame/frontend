import React, { useState } from "react";
import "./Dashboard.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createRoutesFromChildren, Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {db} from './config/auth';
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
 
const Dashboard = (props) => {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const roomsRef = collection(db, "rooms");
  
  const createRoom = async (id) => {
    const newRoomRef = doc(db, "rooms", id);
    const newFields = { round: 0, votes: {v1:0, v2:0, v3:0, v4:0} };
    await setDoc(newRoomRef, newFields);
  };

  const createPlayer = async (roomId) => {
    const newPlayerRef = doc(db, "players", props.user);
    const newFields = { room: roomId, score: 0 };
    await setDoc(newPlayerRef, newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(number);

    const re = /^[0-9\b]+$/;

    if (number === "" || !re.test(number)) {
      console.log("say that you need to enter a number only");
    } else {
      await createRoom(number)
      await createPlayer(number)

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
