import React, { Component } from "react";

const CheckAuth = ChildComponent => class extends Component {
  constructor () {
    super();
    this.state = {
      authed: false
    };
  }

  componentDidMount() {
    fetch("/isLoggedIn" + location.search, { 
      method: "GET"
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log("resp =", resp);
        if (!resp.loggedIn) {
          // window.location.replace("login.html");
        } else {
          console.log("setting state");
          this.setState = {
            authed: true
          };
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    if (this.state.authed) {
      return <ChildComponent authed={this.state.authed} />;
    } else {
      return (<div className="loading">
        Loading...
      </div>);
    }
  }
};

export default CheckAuth;
