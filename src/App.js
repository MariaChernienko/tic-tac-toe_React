import React, { Component } from "react";
import "./App.css";
import Gameboard from "./components/gameboard";

class App extends Component {
  render() {
    return (
      <div className="Game">
        <h1>Hello, Tic tac Toe!</h1>
        <Gameboard size="3" />
      </div>
    );
  }
}

export default App;