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
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { username: null, password: null }
      ]
    }
  }
  handleNewUser(e)
  {
    e.preventDefault();
    
  }
  handleLogin(event) {
    event.preventDefault();
    console.log('login'+this.event.newUserId);
  }
  render() {
    return (
      <Router>
        <div>
          <div>
            <Link to="/login">login</Link>
          </div>
          <br></br>
          <Switch>
            <Route path="/login">
              <br></br>
              <br></br>
              <Login submitLogin={this.handleLogin} newUserId={this.handleNewUser} newPassword={this.handlePassword}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;