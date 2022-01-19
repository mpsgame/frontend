import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './UniqueGame.css'

const UniqueGame = () => {
  const {id} = useParams();

  const listOfPlayers = playerList
                            .sort((p1, p2) => p2.score - p1.score)
                            .map( (p) =>
                                <li key={p.name}> {p.name} - {p.score} </li>
                            );
    const currentRound = 'round1';
    const imageItems = [];
    for (let i = 1; i <= 4; ++i) {
        imageItems.push(
            <ImageListItem key={currentRound + '_' + 'photo' + i}>
                <img
                    src={`${'../GameContent/' + currentRound + '/photo' + i + '.jpg'}`}
                    srcSet={`${'../GameContent/' + currentRound + '/photo' + i + '.jpg'}`}
                    alt={'photo' + i}
                    loading="lazy"
                />
            </ImageListItem>
        );
    }

    return(
        <div>
            <div id="socreboard">{listOfPlayers}</div>
            <div id="gameWindow">
                <p> WELCOME TO GAME : {id} </p>
                <ImageList sx={{ width: 1000, height: 700 }} cols={2} rowHeight={340}>
                        {imageItems}
                </ImageList>
            </div>
        </div>
    );
}

const playerList = [
  {
      name: "player1",
      score: 10
  },
  {
      name: "player2",
      score: 20
  },
  {
      name: "player3",
      score: 30
  },
  {
      name: "player4",
      score: 40
  },
]

export default UniqueGame;
