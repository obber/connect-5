import React, { Component } from "react";
import { socket } from "../socket.config";

import Row from "./rowComponent";

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

    socket.on("sv.gameReady", pkt => {
      this.setState({
        start: true,
        id: pkt.id,
        turn: pkt.turn,
        board: pkt.board
      });
    });

    socket.on("sv.turnOver", pkt => {
      this.setState({
        turn: pkt.turn,
        board: pkt.board
      });
    });

    socket.emit("cl.gameReady");
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
          {this.state.board.map((row, rowIndex) => {
            return <Row
              rowData={row}
              key={rowIndex}
              rowIndex={rowIndex}
              turn={this.state.turn}
            />;
          })}
        </div>
      );
    }
  }
}

export default Board;
