import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { slide as Menu } from 'react-burger-menu';
import {
    Col, Button, Form, FormGroup, Label, Input, FormText, ButtonToggle, Container, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import axios from '../axios';
import { Table } from 'reactstrap';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import 'react-datepicker/dist/react-datepicker.css';
import DisplayActivities from './displayActivities';
import BurgerMenu from 'react-burger-menu';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import Report from './report';

export default class ActivityTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{
                username: null,
                password: null,
                tasks: [{
                    title: null,
                    // duration: null,
                    start_time: null,
                    end_time: null,
                    date: null
                }]
            }],
            title: null,
            startDate: new Date(),
            start_time: moment.utc().startOf('day'),
            // end_time: moment.utc().endOf('day'),
            end_time: null,
            present: new Date(),
            display: moment.utc(moment()),
            toggle: true

        }
        this.handleChangeActivity = this.handleChangeActivity.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChangeActivity = (e) => {
        e.preventDefault()
        this.setState({
            title: e.target.value
        });
    };

    handleStartDate = async date => {
        await this.setState({
            startDate: date
        });
    }
    handleStartTime = async (e) => {
        await this.setState({ start_time: (e.target.value) });
    }

    handleEndTime = async (e) => {

        await this.setState({ end_time: moment.utc(e.target.value) });
    }
    componentDidMount() {
        // this.props.history.push('/dashboard/login/activitytracker');
    }
    handlePrevious = () => {
        let date = this.state.present;
        date.setDate(date.getDate() - 1)
        this.setState({ present: date })

        this.setState({ display: date })
        // this.setState({ toggle: !this.state.toggle })
        // this.setState({toggle:!this.state.toggle})
    }

    handlePresent = (date) => {

        this.setState({ present: date })
        this.setState({ display: this.state.present })
        // this.setState({ toggle: !this.state.toggle })
        // this.setState({toggle:!this.state.toggle})
    }


    handleNext = () => {
        let date = this.state.present;
        date.setDate(date.getDate() + 1)
        this.setState({ present: date })
        this.setState({ display: date })
        // this.setState({ toggle: !this.state.toggle })
        // this.setState({toggle:!this.state.toggle})
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        if (this.state.title === null) {
            alert("Please enter title");
            return;
        }
        if (this.state.end_time)
            await axios.post('/users/postActivities', {
                actSub: {
                    date: moment(this.state.startDate).format('MM-DD-YYYY'),
                    start_time: moment(this.state.start_time).format('HH:mm:ss'),
                    end_time: moment(this.state.end_time).format('HH:mm:ss'),
                    title: this.state.title
                },
                username: this.props.username
            }).then((res) => {
                alert("data sent sucessfully")

            })
                .catch((error) => {
                    alert("data not sent");

                });
        else
            await axios.post('/users/submitActivities', {
                actSub: {
                    date: moment(this.state.startDate).format('MM-DD-YYYY'),
                    start_time: moment(this.state.start_time).format('HH:mm:ss'),
                    title: this.state.title
                },
                username: this.props.username
            }).then((res) => {
                alert("data sent sucessfully")

            })
                .catch((error) => {
                    alert("data not sent");
                });
    }

    render() {
        return (
            <div>
                <Container style={{ border: '2px solid red' }}>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input type="text" placeholder="Enter the Activity" onChange={this.handleChangeActivity} id="exampleEmail" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleDate" sm={5}>StartDate</Label>
                            <Col sm={10}>
                                <DatePicker selected={this.state.startDate} showTimeSelect id="exampleDate" onSelect={this.handleStartDate} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelect" sm={2}>StartTime</Label>
                            <Col sm={10}>
                                <TimePickerComponent placeholder="Select a Time" id="exampleSelect" onChange={this.handleStartTime} format={'HH:mm'} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelectMulti" sm={2}>End Time</Label>
                            <Col sm={10}>
                                <TimePickerComponent placeholder="Select a Time" id="exampleSelectMulti" onChange={this.handleEndTime} format={'HH:mm'} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={10}>
                                <ButtonToggle color="success" onClick={this.handleFormSubmit} >Submit</ButtonToggle>
                            </Col>
                        </FormGroup>
                        {' '}
                    </Form>
                    {/* <Button onClick={this.handleShowData}>Display Activities</Button> */}
                </Container>
                <br></br>

                <Container style={{ border: '2px solid black' }}>

                    <div className='container'>
                        <div ><Table bordered striped dark > <thead>
                            <tr>
                                <th >
                                    <div >
                                        <Button color="primary" onClick={this.handlePrevious}>Previous</Button>
                                    </div>
                                </th>
                                <th colSpan='3'>
                                    <div >
                                        <DatePicker selected={this.state.present} onSelect={this.handlePresent} value={this.state.present} />
                                    </div>
                                </th>
                                <th >
                                    <div >
                                        <Button color="primary" onClick={this.handleNext}>Next</Button>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Duration</th>
                            </tr>
                        </thead>
                            {
                                this.state.toggle ? (<Report date={moment(this.state.present).format('YYYY-MM-DD')} username={this.props.username}></Report>

                                ) : null
                            }

                        </Table>
                        </div>
                    </div>
                </Container>

            </div>
        )
    }
}