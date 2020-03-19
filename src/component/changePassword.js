import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);

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
                            <Label>Email</Label>
                            <Input
                                type="password"
                                name="previousPassword"
                                id="previousPassword"
                                placeholder="previous password"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="newPassword"
                                id="examplePassword"
                                placeholder="new password"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword2">Password</Label>
                            <Input
                                type="password"
                                name="newPasswordConfirm"
                                id="examplePassword2"
                                placeholder="confirm new password"
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}