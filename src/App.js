import React, { Component } from "react";
import "./App.css";
import { ButtonToggle, Container } from 'reactstrap';
import Login from "./login";
import ActivityTracker from "./component/activityTracker";
import News from "./component/news";
import { withRouter } from "react-router-dom";
import Dashboard from "./component/dashboard";
import DashboardWrapper from "./component/dashboardWraper";
import NewsDescription from "./component/newsDescription";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from 'history';
import ChangePassword from './component/changePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure({
//   position="top-right"
// autoClose={ 5000}
// hideProgressBar={ false}
// newestOnTop
// closeOnClick
// rtl={ false}
// pauseOnVisibilityChange
// draggable
// pauseOnHover
// });

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
    // this.props.history.push('')
  }
  handleGoBack() {
    // this.props.history.goBack();
  }
  render() {
    return (
      <div 
      // ref="image-pane"
      // styles={{ backgroundImage:  'url('+process.env.BACKGROUND_IMAGE+')' }}
      >
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <Login />
          <Route path="/login/activitytracker" exact component={ActivityTracker} />
          <Route path='/login/changepassword' component={ChangePassword} />
        </Router>

      </div>
    );
  }
}
export default withRouter(App);