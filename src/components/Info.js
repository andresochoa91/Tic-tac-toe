import React, { useContext } from 'react';
import styled from 'styled-components';
import { TictactoeContext } from '../Context';

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

const Container = styled.div`
  label, input {
    display: block;
    width: 200px;
    margin: auto;
    text-align: center;
  }
  label {
    border-radius: 3px 3px 0 0;
    font-size: 20px;
    color: #fff;
  }

  input {
    border: 1px #ccc solid;
    border-radius: 0 0 3px 3px;
    height: 35px;
  }
`;

const Info = () => {
  const { actions } = useContext(TictactoeContext);
  return (
    <Container>
      <form 
        onChange={ actions.handleInput } 
        onKeyPress={(event) => { 
          if (event.key === "Enter") {
            actions.onClickStartButton(event); 
          }
        }} 
      >
        <label style={{ backgroundColor: "#6af" }} htmlFor="player1">Player 1</label>
        <input maxLength={12} type="text" id="player1"/>
        <br/>
        <label style={{ backgroundColor: "#f6c" }} htmlFor="player2">Player 2</label>
        <input maxLength={12} type="text" id="player2"/>
        <Button onClick={ actions.onClickStartButton }>Start playing</Button>
      </form>
    </Container>
  );
} 

export default Info;