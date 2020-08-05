// import React, { PureComponent } from 'react';
import React from 'react';
import styled from 'styled-components';
import o from '../images/o.png';
import x from '../images/x.png';
// import PropTypes from 'prop-types'

const Col = styled.div`
  background: url('${props => props.img}') center center/cover;
  border: solid 1px #000;
  border-radius: 4px;
  height: 70px;
  width: 70px;
  margin: 1px;
  cursor: pointer;
  :hover {
    border: #666 3px solid;
  }
`;

const Square = ({ id, color, changeColor }) => {
  
  // static propTypes = {
  //   id: PropTypes.number,
  //   color: PropTypes.string,
  //   changeColor: PropTypes.func
  // }
  return (
    <>
      <Col 
        id={ id }
        onClick={ changeColor }
        img={ 
          color === "#6af" ? x : 
            color === "#f6c" ? o :
              color === ""
        }
      />          
    </>
  );
};

export { Col, Square };