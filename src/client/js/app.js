import React, { Component } from "react";

import Board from "./components/boardComponent";
import { connectSocket, socket } from "./socket.config";

class App extends Component {
  constructor() {
    super();

    this.state = {
      inQueue: false
    };

    // bindings
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    connectSocket();
  }

  handleClick() {
    socket.emit("cl.enqueue");

    this.setState({
      inQueue: true
    });
  }

  render () {
    if (this.state.inQueue) {
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

export default App;
