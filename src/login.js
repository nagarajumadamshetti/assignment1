import React, { Component } from 'react';
import ActivityTracker from './component/activityTracker';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: null,
            password: null,
            click: false
        }
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
    handleClickLogin = (e) => {
        console.log(this.state.uname);
        if (this.state.uname === null || this.state.uname === "") {
            alert("enter valid user name");
            return;
        }
        this.setState({
            click: !this.state.click
        });

    }
    handleClickLogout = (e) => {
        this.setState({
            uname: null,
            password: null,
            click: !this.state.click
        });
    }

    render() {
        const styles = {
            center: {
                marginLeft: "auto",
                marginRight: "auto"
            }
        }
        return (
            <div className={styles.center}>
                {this.state.click ?
                    (<div>
                        <button onClick={this.handleClickLogout}>Logout</button>
                        <ActivityTracker username={this.state.uname} password={this.state.password} />
                    </div>)
                    :
                    (<div> 
                        <input type="text" placeholder="username" onChange={this.handleUserId} />
                        <input type="password" placeholder="Password" onChange={this.handlePassword} />
                        <button onClick={this.handleClickLogin}>Login</button>
                    </div>)}
            </div>
            // <div>
            //     hello
            // </div>
        );
    }
}
export default Login;