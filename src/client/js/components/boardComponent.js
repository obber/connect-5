import React, { Component } from "react";

import { socket } from "../socket.config";

class Board extends Component {
  constructor() {
    super();

    this.state = {
      start: false,
      id: null,
      turn: null,
      board: null
    };
  }

  componentDidMount() {
    socket.emit("cl.gameReady");

    socket.on("sv.gameReady", pkt => {
      this.setState({
        start: true,
        id: pkt.id,
        turn: pkt.turn,
        board: pkt.board
      });
    });

    socket.on("sv.turnOver");
  }

  render() {
    if (!this.state.start) {
      return (
        <div>
          <h1>Preparing for battle...</h1>
        </div>
      );
    } else {
      return (
        <div className="board">
          <h1>Board here</h1>
        </div>
      );
    }
  }
}

export default Board;

// {this.props.info.map((num, i) => {
//   return <Tile number={num} key={i} />;
// })}
