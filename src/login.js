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
        console.log(this.state.uname);
        if (this.state.uname === null || this.state.uname === "") {
            alert("enter valid user name");
            return;
        }
        if (this.state.password === null || this.state.password === "") {
            alert("enter valid user name");
            return;
        }
        // axios.post('/users/login', {
        //     username: this.state.uname,
        //     password: this.state.password
        // }).then(this.setState({
        //     click: !this.state.click
        // })).catch((err) => {
        //     alert("invalid credentials");
        //     return;
        // })
        let items = JSON.parse(localStorage.getItem(this.state.uname));
        console.log(items);
        // console.log(items.username);
        // console.log(items.password)
        let obj = null;
        if (!items) {
            // alert("user doesnt exist");
            obj = {
                username: this.state.uname,
                password: this.state.password,
                tasks: []
            }
            // localStorage.setItem(this.state.uname, JSON.stringify(obj))
        }
        else if (items.password !== this.state.password) {
            console.log(items.password)
            alert("password incorrect");
            return;
        }
        ;
        await this.setState({
            click: !this.state.click
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

                        <div >
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