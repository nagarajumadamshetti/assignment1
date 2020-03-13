import React, { Component } from 'react';
import './App.css';
import SignUp from './signUp';
import Login from './login';
import ActivityTracker from './component/activityTracker';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  toggle = false;
  constructor(props) {
    super(props);
    this.state = {
      username: null,
       password: null
    }

  }
  handleNewUser(e) {
    e.preventDefault();

  }
  handleLogin(event) {
    event.preventDefault();
    this.toggle = !this.toggle;
    this.setState({ username:this.state.username})
    console.log('login' + this.event.newUserId);
  }
  render() {
    
    return (
      <Login></Login>
     

    );
  }
}
export default App;