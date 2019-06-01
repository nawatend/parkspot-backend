/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/*
Import Main application
*/
import Main from './app/Main';

class App extends Component {
  render() {
    return (
      <Router>
        <Main />
      </Router>
    );
  }
}

export default App;