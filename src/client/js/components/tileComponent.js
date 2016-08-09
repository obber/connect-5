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
    this.setState({
      id: indexToTileId(this.props.rowIndex, this.props.columnIndex)
    });
  }

  handleClick(tileId) {
    if (!this.props.turn) {
      throw new Error("Not your turn.");
    } else if (this.props.tile !== 0) {
      throw new Error("That tile is taken.");
    }

    // send a socket signal determining player's move
    socket.emit("cl.turnOver", { tileId });
  }

  render() {
    let className = "board-tile";
    
    if (this.props.tile === 1) {
      className += " tile-1";
    } else if (this.props.tile === 2) {
      className += " tile-2";
    }

    if (this.props.last === this.state.id) {
      className += " last";
    }

    return (
      <div
        className={className}
        id={this.state.id}
        onClick={this.handleClick.bind(this, this.state.id)} >
        <div className="piece"></div>
      </div>
    );
  }
}

export default Tile;
