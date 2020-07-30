import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './components/Cell';
import Info from './components/Info';
import tictactoebg from './tictactoebg.png';
import { Consumer } from './Context';

const Background = styled.div`
  background: url(${tictactoebg}) no-repeat center center/contain;
  height: 210px;
`;

const Title = styled.h1``;
const Paragraph = styled.p``;

const Button = styled.button`
  display: block;
  border: none;
  background-color: #3c9;
  color: #fff;
  font-size: 20px;
  margin: 30px auto;
  padding: 5px 15px;
  border-radius: 3px;
  :hover {
    background-color: #1a7;
  }
`;

const Body = styled.div`
  width: 1000px;
  margin: auto;
  padding: 10px;
  ${Title}, ${Paragraph} {
    text-align: center;
  }
`;

class App extends Component {

  render() {
    return (
      <Consumer>
        {context => {
          return (
            <Body>
              <Background>
              </Background>
              <Title>Tic Tac Toe!</Title>
              {
                context.start === false ? 
                <div>
                  <Paragraph>This is a simple Tic Tac Toe game.</Paragraph>
                  <Button onClick={ context.startButton }>START</Button>
                </div> :
                
                context.readyToPlay === false ?
                <Info /> :
                
                <Cell player1={ context.player1 } player2={ context.player2 }/>
              }
            </Body>
          );
        }}
      </Consumer>
    );
  }
}

export default App;
