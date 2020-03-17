import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input,ButtonToggle } from 'reactstrap';
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
componentDidMount() {
    this.props.history.push({
        pathname: '/login',
         state: { 
             from: this.props.location.pathname
         }
    })
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
                        <ButtonToggle color="primary"onClick={this.handleClickLogout}>Logout</ButtonToggle>
                        <ActivityTracker username={this.state.uname} password={this.state.password} />
                    </div>)
                    :
                    (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh',alignContent:'center' }}>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleEmail" className="mr-sm-2">USERNAME</Label>
                                <Input type="text" placeholder="username" onChange={this.handleUserId} id="exampleEmail" />
                            </FormGroup>
                            <br></br>
                            {' '}
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="examplePassword" className="mr-sm-2">PASSWORD</Label>
                                <Input type="password" placeholder="Password" onChange={this.handlePassword} id="examplePassword" />
                            </FormGroup>
                            {' '}
                            <ButtonToggle color="primary"onClick={this.handleClickLogin}>Sign in</ButtonToggle>
                        </Form>
                    </div>)}
            </div>
            // <div>
            //     hello
            // </div>
        );
    }
}
export default Login;