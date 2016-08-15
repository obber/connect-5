import React, { Component } from "react";

import Board from "./components/boardComponent";
import { connectSocket, socket } from "./socket.config";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inQueue: false,
      loggedIn: false,
      loading: true,
      error: ""
    };

    // bindings
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.login().then(
      resp => this.setState({ loading: !resp, loggedIn: true }),
      error => this.setState({ loading: true, error: error })
    );

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
    if (this.state.loading) {
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
          <h1>Connect 5!</h1>
          <button onClick={this.handleClick}>Queue for a match</button>
        </div>
      );
    }
  }
}

export default App;
