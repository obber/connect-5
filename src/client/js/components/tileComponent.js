import React, { Component } from "react";

import indexToTileId from "../modules/indexToTileId";
import { socket } from "../socket.config";

class Tile extends Component {
  constructor() {
    super();

    this.state = {
      className: "board-tile",
      id: null
    };
  }

  componentWillMount() {
    let playerClass = "";

    if (this.props.tile === 1) {
      playerClass = " tile-1"
    } else if (this.props.tile === 2) {
      playerClass = " tile-2"
    }

    this.setState({
      id: indexToTileId(this.props.rowIndex, this.props.columnIndex),
      className: this.state.className + playerClass
    });
  }

  handleClick(tileId) {
    // only if it's the player's turn & the tile is available
    if (this.props.turn && this.props.tile === 0) {
      // send a socket signal determining player's move
      socket.emit("cl.turnOver", { tileId });
    } else {
      throw new Error("Not your turn, or that tile is taken");
    }
  }

  render() {
    return (
      <div
        className={this.state.className}
        id={this.state.id}
        onClick={this.handleClick.bind(this, this.state.id)}
      >
        {this.props.tile}
      </div>
    )
  }
}

export default Tile;
