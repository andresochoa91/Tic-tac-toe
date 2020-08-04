import React, { Component } from 'react';
import styled from "styled-components";
import { Square } from './Square';
import { Consumer } from '../Context';
import PropTypes from 'prop-types';

//Styled components

const Board = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Content= styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 216px;
`;

const Button = styled.button` 
  padding: 5px 15px;
  margin: 30px auto;
  font-size: 20px;
  background-color: #3c9;
  color: #fff;
  border: none;
  border-radius: 5px;
  :hover {
    background-color: #1a7;
  }
`;

const Players = styled.div``;
const Buttons = styled.div``;

const Body = styled.div`
  ${Players}, ${Buttons} {
    display: flex;
    justify-content: space-around;
  }
`;

const Paragraph = styled.p`
  font-size: 25px;
  border: ${(props) => props.primary} solid 2px;
  border-radius: 5px;
  color: ${(props) => props.primary};
  padding: 2px 15px;
`;

const Banner = styled.div`
  background-color: ${props => props.color};
  color: #fff;
  text-align: center;
  border-radius: 10px;
  width: 100px;
  margin: auto;
  padding: auto 5px;
`;

class Cell extends Component {

  static propTypes = {
    player1: PropTypes.string,
    player2: PropTypes.string,
  }

  state = {
    color: "#6af",
    count: 0,
    playing: true,
    board: ["", "", "", "", "", "", "", "", ""],
    winner: "",
  }
  

  changeColor = (event) => {
    const { color, playing, board } = this.state;

    if (!board[event.target.id] && playing === true) {    
      const newBoard = [...board];
      newBoard[event.target.id] = color;
      this.setState({ board: newBoard });

      if (color === "#6af") {
        this.setState({ 
          color: "#f6c",
        })  
      } else {
        this.setState({ 
          color: "#6af",
        })
      }
      this.setState( prevState => ({
         count: prevState.count + 1 
      }));
    }
  }

  chooseWinner () {
    return this.state.color === "#6af" ? this.player2 : this.player1;
  }

  componentDidUpdate () {
    const { count, playing } = this.state;
    if ((this.conditions() || count === 9) && playing === true) {
      this.setState({
        playing: false,
      })
      if (this.conditions()) {
        alert(`${ this.chooseWinner() } wins`);
        this.setState({ winner: `${ this.chooseWinner() }` })
      } else {
        alert("Tie");
      }
    } 
  }

  validation = (num1, num2, num3) => {
    let board = this.state.board;
    return board[num1] &&
           board[num1] === board[num2] &&
           board[num2] === board[num3]
  }
  
  conditions = () => {
    let val = this.validation;
    return (val(0, 1, 2) || val(3, 4, 5) || val(6, 7, 8) ||
            val(0, 3, 6) || val(1, 4, 7) || val(2, 5, 8) ||
            val(0, 4, 8) || val(2, 4, 6)                   
    );
  }

  isPlayer1sTurn() {
    return this.state.color === "#6af"
  }

  restart = () => {
    this.setState({ 
      playing: true,
      board: ["", "", "", "", "", "", "", "", ""],
      color: "#6af",
      count: 0,
      winner: ""
    })
  }

  render() {
    const { winner, count, color, playing, board } = this.state;
    return (
      <Consumer>
        {context => {
          const { actions, player1, player2 } = context;
          this.player1 = player1;
          this.player2 = player2;
          return (
            <Body>
              { winner && <Banner color="#1a7">{winner} wins</Banner>}
              { (!winner && count === 9) && <Banner color="#e69500">Tie</Banner>}
              <Players>
                <div>
                  <Paragraph primary="#6af">{ player1 }</Paragraph>
                  { (this.isPlayer1sTurn() && playing) && <Banner color="#e69500">Your turn</Banner> }
                </div>
                <div>
                  <Paragraph primary="#f6c">{ player2 }</Paragraph>
                  { (color !== "#6af" && playing) && <Banner color="#e69500">Your turn</Banner> }
                </div>
              </Players>
              <Board>
                <Content>
                  { board.map((num, i) => 
                    <Square 
                      key={ i } id={ i } color={ num } changeColor={ this.changeColor }
                    />
                  ) }
                </Content>  
              </Board>
              <Buttons>
                <Button onClick={ this.restart }>Restart</Button>
                <Button onClick={ actions.onClickNewGameButton }>New Game</Button>
              </Buttons>
            </Body>
          );
        }}
      </Consumer>
    )
  }
}

export default Cell;