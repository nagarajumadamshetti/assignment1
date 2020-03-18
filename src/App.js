import React, { Component } from "react";
import "./App.css";
import { ButtonToggle } from 'reactstrap';
import Login from "./login";
import ActivityTracker from "./component/activityTracker";
import News from "./component/news";
import {  withRouter } from "react-router-dom";
import Dashboard from "./component/dashboard";
import DashboardWrapper from "./component/dashboardWraper";
import NewsDescription from "./component/newsDescription";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from 'history';

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
  componentDidMount() {
    this.props.history.push('')
  }
  handleGoBack()
  {
    window.history.back();
  }
  render() {
    return (
      <Router>
        <div>
          <h1>Assignment -1 </h1>

          {' '}
          <ButtonToggle color="danger" onClick={()=>this.handleGoBack}>Back</ButtonToggle>
          {/* <Link to='/dashboard'>Dashboard</Link> */}

          <Route path="/" exact component={DashboardWrapper} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/login" exact component={Login} />
          <Route path="/dashboard/login/activitytracker" exact component={ActivityTracker}/>
          <Route path="/dashboard/news" exact component={News} />
          <Route path="/dashboard/news/:id" component={NewsDescription} />
        </div>
      </Router>
    );
  }
}
export default withRouter(App);