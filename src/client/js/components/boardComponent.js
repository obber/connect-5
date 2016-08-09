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
      board: null,
      message: null
    };
  }

  componentWillMount() {
    socket.on("sv.gameInitialized", () => {
      socket.emit("cl.gameReady");
    });

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
        board: pkt.board,
        last: pkt.last
      });
    });

    socket.on("sv.gameOver", pkt => {
      this.setState({
        board: pkt.board,
        last: pkt.last,
        message: pkt.win ? "You win!" : "You lose."
      });
    });
  }

  render() {
    if (!this.state.start) {
      return <h1>Preparing for battle...</h1>;
    } else {
      return (
        <div className="board">
          <div className="message">{this.state.message ? this.state.message : ""}</div>
          {this.state.board.map((row, rowIndex) => {
            return <Row
              rowData={row}
              key={rowIndex}
              rowIndex={rowIndex}
              turn={this.state.turn}
              last={this.state.last}
            />;
          })}
        </div>
      );
    }
  }
}

export default Board;
