import React, { Component } from 'react';
import { Col, Row, Button,Container, Form, FormGroup, Label, Input, ButtonToggle } from 'reactstrap';
import ActivityTracker from './component/activityTracker';
import axios from './axios'
import { Link } from 'react-router-dom';
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
        if (this.state.uname === null|| this.state.uname==="" ) {
            alert("enter valid user name ");
            return;
        }
        if (this.state.password === null || this.state.password==="") {
            alert("enter valid password ");
            return;
        }
        axios.post('/users/login', {
            username: this.state.uname,
            password: this.state.password
        }).then(this.setState({
            click: !this.state.click
        }))
            .catch()
    }
    handleClickLogout = (e) => {
        this.setState({
            uname: null,
            password: null,
            click: !this.state.click
        });
    }
    handleClickSignUp = () => {
        if (this.state.uname === null|| this.state.uname==="" ) {
            alert("enter valid user name ");
            return;
        }
        if (this.state.password === null || this.state.password==="") {
            alert("enter valid password ");
            return;
        }
        axios.post('/users/signup', {
            username: this.state.uname,
            password: this.state.password
        }).then()
            .catch()
        this.setState({
            click: !this.state.click
        });
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
            <div className={styles.center}>
                {this.state.click ?
                    (<div>
                        <ButtonToggle color="primary" onClick={this.handleClickLogout}>Logout</ButtonToggle>
                        <ActivityTracker username={this.state.uname} password={this.state.password} />
                    </div>)
                    :
                    // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', alignContent: 'center' }}
                    (<div >
                        <Container className="App">
                            <h2>Sign In</h2>
                            <Form className="form">
                                <Col  >
                                    <FormGroup>
                                    <Label >USERNAME</Label>
                                <Input type="text" placeholder="username" onChange={this.handleUserId} id="exampleEmail" />
                            
                                        
                                    </FormGroup>
                                </Col>
                                <Col >
                                    <FormGroup>
                                    <Label for="examplePassword" >PASSWORD</Label>
                                <Input type="password" placeholder="Password" onChange={this.handlePassword} id="examplePassword" />
                             
                                    </FormGroup>
                                </Col>
                                <ButtonToggle color="primary" onClick={this.handleClickLogin}>Sign in</ButtonToggle>
                            <ButtonToggle color='danger' onClick={this.handleClickSignUp}>SignUp</ButtonToggle>
                            {' '}
                            <Col><Row></Row></Col>
                            <Col>
                            <Link to={'/dashboard/login/changepassword'}> changepassword</Link>
                            </Col>
                            
                            </Form>
                        </Container>
                    </div>)}
            </div>
        );
    }
}
export default Login;