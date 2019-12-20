import React, { Component } from "react";
import Routes from "./routes/Routes";
import { removeState } from './Utils/persistState'



class App extends Component {
  
  render() {
    // remove state from local storage with socket.io
    removeState()
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
