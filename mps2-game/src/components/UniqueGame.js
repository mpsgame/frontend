import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UniqueGame = () => {
  const { id } = useParams();

  return (
    <div>
      <div>WELCOME TO GAME : {id}</div>
    </div>
  );
};

export default UniqueGame;
