import React, { Component } from "react";

class Tile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="tile">
        <p>{this.props.number}</p>
      </div>
    );
  }
}

export default Tile;
