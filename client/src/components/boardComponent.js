import React, { Component } from 'react';
import Tile from './tileComponent';

class Board extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div className="board">
        {this.props.info.map((num, i) => {
          return <Tile number={num} key={i} />;
        })}
      </div>
    );
  }
}

export default Board;
