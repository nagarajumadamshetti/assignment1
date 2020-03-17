import React, { Component } from "react";
import "./App.css";
import SignUp from "./signUp";
import { ButtonToggle } from 'reactstrap';
import Login from "./login";
import ActivityTracker from "./component/activityTracker";
import News from "./component/news";
import { Redirect,withRouter } from "react-router-dom";
import Dashboard from "./component/dashboard";
// import {browserHistory} from 'react-router';
import DashboardWrapper from "./component/dashboardWraper";
import NewsDescription from "./component/newsDescription";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class App extends Component {
  toggle = false;
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }
  handleNewUser(e) {
    e.preventDefault();
  }
  handleLogin(event) {
    event.preventDefault();
    this.toggle = !this.toggle;
    this.setState({ username: this.state.username });
    console.log("login" + this.event.newUserId);
  }
  render() {
    return (
      <Router>
        <div>
          <h1>Assignment -1 </h1>
          {' '}
          <ButtonToggle color="danger" onClick={this.props.history.goBack()}>Back</ButtonToggle>
          {/* <Link to='/dashboard'>Dashboard</Link> */}

          <Route path="/" exact component={DashboardWrapper} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/login" exact component={Login} />
          <Route
            path="/dashboard/login/activitytracker"
            exact
            component={ActivityTracker}
          />
          <Route path="/dashboard/news" exact component={News} />
          {/* <Route path="/dashboard/news/:id"  render={(props) => <NewsDescription {...props} />} /> */}
          <Route path="/dashboard/news/:id" component={NewsDescription} />
          {/* <Route path=""> */}
        </div>
      </Router>
    );
  }
}
export default withRouter(App);