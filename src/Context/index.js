import React, { Component } from 'react';

const TictactoeContext = React.createContext();

export class Provider extends Component {

  state = {
    start: false,
    readyToPlay: false,
    player1: "",
    player2: ""
  }

  handleInput = (e) => {
    if (e.target.id === "player1") {
      this.setState({ player1: e.target.value }) 
    } else if (e.target.id === "player2") {
      this.setState({ player2: e.target.value }) 
    }
  } 

  onClickStartButton = (event) => {
    event.preventDefault();
    const { player1, player2 } = this.state;
    if (player1 && player2) {
      this.setState({ readyToPlay: true });
    } else {
      alert("You must have 2 players to start the game!");
    }
  }

  onClickNewGameButton = () => {
    this.setState({ readyToPlay: false, player1: "", player2: "" });
  }

  startButton = () => {
    this.setState({ start: true });
  }

  render() {
    const { start, readyToPlay, player1, player2 } = this.state;
    return (
      <TictactoeContext.Provider value={{
        onClickStartButton: this.onClickStartButton,
        handleInput: this.handleInput,
        onClickNewGameButton: this.onClickNewGameButton,
        player1: player1,      
        player2: player2,
        start: start,
        readyToPlay: readyToPlay,
        startButton: this.startButton      
      }}>
        { this.props.children }
      </TictactoeContext.Provider>
    );
  }
}

export const Consumer = TictactoeContext.Consumer;