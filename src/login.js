import React, { Component } from 'react';
import DisplayActivities from './component/displayActivities';
import ActivityTracker from './component/activityTracker';
class Login extends Component {
    state = {
        uname: null,
        password: null,
        click: false
    }
    handleUserId = (e) => {
        this.setState({
            uname: e.target.value
        });
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    handleClick = (e) => {
        this.setState({
            click: true
        });
    }
    render() {
        return (
            <div>
                <div >
                    <input type="text" placeholder="username" onChange={this.handleUserId} />
                    <input type="password" placeholder="Password" onChange={this.handlePassword} />
                    <button onClick={this.handleClick}>Login</button>
        {this.state.click?<ActivityTracker username={this.state.uname} password={this.state.password}/>:null}
                </div>
            </div>
        );
    }
}
export default Login;