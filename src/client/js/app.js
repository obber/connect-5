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
    console.log("emitting cl.enqueue");
    socket.emit("cl.enqueue");

    this.setState({
      inQueue: true
    });
  }

  render () {
    if (!this.props.authed) {
      return (
        <div>
          Loading!
        </div>
      );
    } else if (this.state.inQueue) {
      return (
        <div className="container">
          <Board />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Hello world!</h1>
          <button onClick={this.handleClick}>Queue for a match</button>
        </div>
      );
    }
  }
}

export default App;
