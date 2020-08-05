// import React, { Component } from 'react';
import React, { useState } from 'react';

export const TictactoeContext = React.createContext();
export const Provider = (props) => {
  
  const [ start, setStart ] = useState(false);
  const [ readyToPlay, setReadyToPlay ] = useState(false);
  const [ player1, setPlayer1 ] = useState("");
  const [ player2, setPlayer2 ] = useState("");

  const handleInput = (e) => {
    if (e.target.id === "player1") {
      setPlayer1(e.target.value);
    } else if (e.target.id === "player2") {
      setPlayer2(e.target.value);
    }
  } 

  const onClickStartButton = (event) => {
    event.preventDefault();
    if (player1 && player2) {
      setReadyToPlay(true);
    } else {
      alert("You must have 2 players to start the game!");
    }
  }

  const onClickNewGameButton = () => {
    setReadyToPlay(false);
    setPlayer1("");
    setPlayer2("");
  }

  const startButton = () => {
    setStart(true);
  }


  return (
    <TictactoeContext.Provider value={{
      start,
      readyToPlay,
      player1,      
      player2,
      actions: {
        onClickStartButton: onClickStartButton,
        handleInput: handleInput,
        onClickNewGameButton: onClickNewGameButton,
        startButton: startButton      
      }
    }}>
      { props.children }
    </TictactoeContext.Provider>
  );
  
}

export const Consumer = TictactoeContext.Consumer;