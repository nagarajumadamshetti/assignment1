import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import axios from '../axios';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            prevPassword: null,
            newPassword: null,
            confirmPassword: null
        }
    }
    handleUserId = (e) => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    }
    handlePreviousPassword = (e) => {
        e.preventDefault();
        if (this.state.username === null || this.state.username === "") {
            alert("username cant be null");
            return;
        }
        this.setState({ prevPassword: e.target.value });
    }
    handleNewPassword = (e) => {
        e.preventDefault();
        if (this.state.prevPassword === null || this.state.prevPassword === "") {
            alert("previous password cant be a null value");
            return;
        }
        this.setState({ newPassword: e.target.value });
    }
    hanldeConfirmPassword = (e) => {
        e.preventDefault();
        if (this.state.newPassword === null || this.state.newPassword === "") {
            alert(" new password cannot be null")
        }
        this.setState({ confirmPassword: e.target.value })
    }
    handleResetPassword = (e) => {
        e.preventDefault();
        if (this.state.confirmPassword === null || this.state.confirmPassword === "") {
            alert("enter valid confirm password");
            return;
        }
        if (this.state.confirmPassword !== this.state.newPassword) {
            alert("passwords donot match");
            return;
        }
        axios.post('/users/changePassword', {
            username: this.state.username,
            password: this.state.confirmPassword
        }).then()
        .catch(console.log("error has occured"));
    }
    render() {
        return (
            <Container className="App">
                <h2>CHANGE PASSWORD HERE</h2>
                <Form className="form">
                    <Col  >
                        <FormGroup>
                            <Label >USERNAME</Label>
                            <Input type="text" placeholder="username" onChange={this.handleUserId} id="exampleEmail" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Prevoious Password</Label>
                            <Input
                                type="password"
                                name="previousPassword"
                                id="previousPassword"
                                placeholder="previous password"
                                onChange={this.handlePreviousPassword}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">New Password</Label>
                            <Input
                                type="password"
                                name="newPassword"
                                id="examplePassword"
                                placeholder="new password"
                                onChange={this.handleNewPassword}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword2">Confirm Password</Label>
                            <Input
                                type="password"
                                name="newPasswordConfirm"
                                id="examplePassword2"
                                placeholder="confirm new password"
                                onChange={this.hanldeConfirmPassword}
                            />
                        </FormGroup>
                    </Col>
                    <Button color='danger' onClick={this.handleResetPassword}>Reset Password</Button>
                </Form>
            </Container>
        );
    }
}