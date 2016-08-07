import reactDOM from "react-dom";
import React, { Component } from "react";

import Board from "./components/boardComponent";
import { connectSocket, socket } from "./socket.config";

class Comp extends Component {
  constructor() {
    super();

    this.state = {
      inGame: false
    };

    // bindings
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    connectSocket();
  }

  handleClick() {
    socket.on("sv.gameInitialized", () => {
      this.setState({
        inGame: true
      });
    });

    socket.emit("cl.enqueue");
  }

  render () {
    if (this.state.inGame) {
      return (
        <div>
          <Board />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Hello world!</h1>
          <button onClick={this.handleClick}>Queue for a match</button>
        </div>
      );
    }
  }
}

reactDOM.render(<Comp />, document.getElementById("app"));
