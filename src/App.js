import React, { Component } from "react";
import Launches from "./views/Launches";

class App extends Component {
  render() {
    return (
      <main className={`layout`}>
        <Launches />
      </main>
    );
  }
}

export default App;
