import React, { Component } from 'react';
import DisplayActivities from './component/displayActivities';
import ActivityTracker from './component/activityTracker';
class Login extends Component {
    toggle=false;
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
        this.toggle=!this.toggle;
        this.setState({
            click: !this.state.click
        });
    }
    render() {
        return (
            <div>
                

        {this.state.click?( <div> <button onClick={this.handleClick}>Logout</button><ActivityTracker username={this.state.uname} password={this.state.password}/></div>):(
            <div >                    <input type="text" placeholder="username" onChange={this.handleUserId} />
                    <input type="password" placeholder="Password" onChange={this.handlePassword} />
                    <button onClick={this.handleClick}>Login</button>
                    </div>)}
                
            </div>
        );
    }
}
export default Login;