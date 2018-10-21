import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//COMPONENTS
import Home from './pages/Home/Home';
import Saved from './pages/Saved/Saved';

// import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Saved" component={Saved}/>
          </switch>
        </Router>
      </div>
    );
  }
}

export default App;
