import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, ButtonToggle, Container } from 'reactstrap';
import ActivityTracker from './component/activityTracker';
import moment from 'moment';
import SideBar from './sidebar';
import axios from './axios';

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
    handleClickLogin = async (e) => {
        if (this.state.uname === null || this.state.uname === "") {
            alert("enter valid user name");
            return;
        }
        if (this.state.password === null || this.state.password === "") {
            alert("enter valid user name");
            return;
        }
        await axios.post('/users/login', {
            username: this.state.uname,
            password: this.state.password
        }).then((res) => {
            if (res) {
                this.setState({
                    click: !this.state.click
                });
                alert("login successful");
            }
            else {
                alert("Invalid credentials");
                return;
            }
        }
        ).catch((err) => {
            alert("invalid credentials");
            return;
        });
    }
    handleClickLogout = (e) => {
        // this.props.history.goBack();
        this.setState({
            uname: null,
            password: null,
            click: !this.state.click
        });
    }
    handleClickSignUp = async () => {
        try {
            if (this.state.uname === null || this.state.uname === "") {
                alert("enter valid user name ");
                return;
            }
            if (this.state.password === null || this.state.password === "") {
                alert("enter valid password ");
                return;
            }
            let items = JSON.parse(localStorage.getItem(this.state.uname));
            if (items) {
                alert("User already exists");
                return;
            }
            const obj = {
                username: this.state.uname,
                password: this.state.password,
                tasks: []
            }
            // localStorage.setItem(this.state.uname, JSON.stringify(obj));
            this.setState({ click: !this.state.click });
        } catch (error) {
            alert("invalid");
            return;
        }
    }
    componentDidMount() {
        // this.props.history.push('/dashboard/login');
    }
    render() {
        const styles = {
            center: {
                marginLeft: "auto",
                marginRight: "auto"
            }
        }
        return (
            // <div className={styles.center}>
            <Container className="themed-container" fluid={true}>
                {this.state.click ?
                    (
                        <div style={{ styles }}>
                            <SideBar username={this.state.uname} password={this.state.password} logout={this.handleClickLogout}></SideBar>
                            {/* <ActivityTracker username={this.state.uname} password={this.state.password} logout={this.handleClickLogout} /> */}

                        </div>
                    )
                    : (
                        <Container className="themed-container" fluid="sm">
                            <Row>
                                <h1> Task Tracker</h1>
                            </Row>
                            <Row>
                                <FormGroup >
                                    <Col><Label for="exampleEmail" >USERNAME</Label></Col>
                                    <Col><Input type="text" placeholder="username" onChange={this.handleUserId} id="exampleEmail" /></Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup >
                                    <Col><Label for="examplePassword" >PASSWORD</Label></Col>
                                    <Col><Input type="password" placeholder="Password" onChange={this.handlePassword} id="examplePassword" /></Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <ButtonToggle color="primary" onClick={this.handleClickLogin}>Sign in</ButtonToggle>
                                {/* <ButtonToggle color='danger' onClick={this.handleClickSignUp}>SignUp</ButtonToggle> */}
                            </Row>
                            {/* <Row>
                                    <Link to={'/dashboard/login/changepassword'}> changepassword</Link>
                                </Row> */}
                        </Container>

                    )}
            </Container>
        );
    }
}
export default Login;