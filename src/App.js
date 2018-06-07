import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GameBoard from './GameBoard.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron gameBoard">
           <GameBoard/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


