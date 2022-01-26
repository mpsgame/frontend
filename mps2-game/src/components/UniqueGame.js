import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Header from "../Header";
import './UniqueGame.css'
import { Button } from "@mui/material";
import { db } from "../config/auth";
import { collection, doc, getDoc, getDocs, increment, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getThemeProps, style } from "@mui/system";

const UniqueGame = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [ended, setEnded] = useState(false);
    const [selected, setSelected] = useState(0);
    const [endScore, setEndScore] = useState([]);

    const [playerList, setPlayerList] = useState([]);
    const playersRef = useRef(playerList);
    const setPlayersRef = (val) => {
        playersRef.current = val;
        setPlayerList(val);
    }

    const [started, setStarted] = useState(false);
    const startRef = useRef(started);
    const setStartRef = (val) => {
        startRef.current = val;
        setStarted(val);
    }
    const maxRound = 4;
    const {id} = useParams();
    const roomsRef = collection(db, "rooms");

    const roundChange = onSnapshot(doc(db, 'rooms', id), (doc) => {
        if (!startRef.current && doc.data().round === 1) {
            startLocalGame();
        }
    })

    const playerQ = query(collection(db, 'players'), where("room", "==", id));

    const handleVote = async (voteNr) => {
        setSelected(voteNr);
        var roomDocRef = doc(db, "rooms", id);
        var newFields = {};
        newFields["votes.v" + voteNr] = increment(1);
        await updateDoc(roomDocRef, newFields);
    };

    const updatePlayerScore = async (score) => {
        var playerDocRef = doc(db, "players", props.user);
        await updateDoc(playerDocRef, {score: increment(score)});
    }

    const nextRound = async () => {
        var roomDocRef = doc(db, "rooms", id);
        var roomSnap = await getDoc(roomDocRef);
        var votes = [roomSnap.data().votes.v1, roomSnap.data().votes.v2, 
            roomSnap.data().votes.v3, roomSnap.data().votes.v4]
        votes.sort((a, b) => b - a);
        console.log(votes);
        var score = 100;
        for (var i = 0; i < 4; ++i) {
            if (roomSnap.data().votes["v"+selected] === votes[i])
                break;
            score -= 33;
        }

        if (score > 0) {
            console.log("Player: " + props.user + ", score: " + score);
            await updatePlayerScore(score);
            await updatePlayers();
        }

        if (currentRound < maxRound) {
            var roomDocRef = doc(db, "rooms", id);
            var newFields = {round: increment(1), votes: {v1:0, v2:0, v3:0, v4:0}};
            await updateDoc(roomDocRef, newFields);
        } else {
            setEnded(true);
            setEndScore(playerList);
            playerList.forEach(p => resetPlayer(p.name));
        }
    }

    const startLocalGame = async () => {
        setSeconds(0);
        setCurrentRound(1);
        setStartRef(true);
    }

    const startGame = async () => {
        setSeconds(0);
        setCurrentRound(1);
        setStartRef(true);
        await nextRound();
    }

    const updatePlayers = async () => {
        const playerSnap = await getDocs(playerQ);
        var players = [];
        playerSnap.forEach((doc) => {players.push({score: doc.data().score, name: doc.id})});
        setPlayersRef(players);
    }

    const resetPlayer = async (userId) => {
        const newPlayerRef = doc(db, "players", userId);
        const newFields = { room: "0", score: 0 };
        await setDoc(newPlayerRef, newFields);
    };

    useEffect(() => {
        let interval = null;

        if (seconds % 3 === 0) {
            updatePlayers();
        }

        if (seconds < 15) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {
            setSeconds(0);
            setCurrentRound(currentRound + 1);
            if (currentRound > 0 && currentRound <= maxRound)
                nextRound();
        }
        return () => clearInterval(interval);
    }, [seconds]);

    const listOfPlayers = playerList
                                .sort((p1, p2) => p2.score - p1.score)
                                .map( (p) =>
                                    <li key={p.name}> {p.name} - {p.score} </li>
                                );
        const imageItems = [];
        for (let i = 1; i <= 4; ++i) {
            var st = {backgroundColor: "white"};
            if (selected === i)
                st = {backgroundColor: "cyan"};

            imageItems.push(
                <ImageListItem key={currentRound + '_' + 'photo' + i}
                    style = {{
                        border: 1
                    }}
                >
                    <Button style={st} onClick={() => handleVote(i)}>
                    <img
                        src={`${'../GameContent/round' + currentRound + '/photo' + i + '.jpg'}`}
                        srcSet={`${'../GameContent/round' + currentRound + '/photo' + i + '.jpg'}`}
                        alt={'photo' + i}
                        loading="lazy"
                    />
                    </Button>
                </ImageListItem>
            );
        }

        return(
            <div>
                <Header />
                <div id="socreboard">{listOfPlayers}</div>
                {started && !ended && <h3>{seconds}/15</h3>}
                <div id="gameWindow">
                    <h1> WELCOME TO GAME : {id} </h1>
                    {!started ? <Button onClick={startGame}> Start Game </Button> :
                        <div>
                        <h2> ROUND : {currentRound} </h2>
                        {ended ? <div> 
                            <h1> GAME ENDED! </h1>
                            <h2> FINAL SCORE: </h2>
                            {endScore
                                .sort((p1, p2) => p2.score - p1.score)
                                .map( (p) =>
                                    <li key={p.name}> {p.name} - {p.score} </li>
                            )}
                        </div> :
                            <ImageList sx={{ width: 800, height: 450 }} cols={2} rowHeight={200}>
                                    {imageItems}
                            </ImageList>
                        }
                        </div>
                    }
                </div>
            </div>
        );
    }

export default UniqueGame;
