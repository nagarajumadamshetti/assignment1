import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { slide as Menu } from 'react-burger-menu';
import {
    Col, Button, Form, FormGroup, Label, Input, ButtonToggle, Container,
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
import { toast } from 'react-toastify'

import RSC from "react-scrollbars-custom";
import Scrollbar from 'smooth-scrollbar';

import ScrollArea from 'react-scrollbar'

export default class ActivityTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{
                username: null,
                password: null,
                tasks: [{
                    title: null,
                    start_time: null,
                    end_time: null,
                    date: null
                }]
            }],
            title: '',
            startDate: new Date(),
            start_time: moment.utc().startOf('day'),
            end_time: '',
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
    }

    handlePresent = (date) => {
        this.setState({ present: date })
        this.setState({ display: this.state.present })
    }


    handleNext = () => {
        let date = this.state.present;
        date.setDate(date.getDate() + 1)
        this.setState({ present: date })
        this.setState({ display: date })
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        if (this.state.title === null || this.state.title === "") {
            toast.error("Please enter title!!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
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
                toast.info("data sent sucessfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
                .catch((error) => {
                    toast.warn("data not sent", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

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
                toast.info("data sent sucessfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
                .catch((error) => {
                    toast.warn("data not sent", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                });
        this.setState({
            title: '',
            end_time: '',
            startDate: new Date(),
            start_time: moment.utc().startOf('day')
        })
    }

    render() {
        return (
            <Container>
                <Container style={{ border: '2px solid red' }}>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Title</Label>
                            <Col sm={2}>
                                <Input type="text" value={this.state.title} placeholder="Enter the Activity" onChange={this.handleChangeActivity} id="exampleEmail" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleDate" sm={2}>StartDate</Label>
                            <Col sm={3}>
                                <DatePicker selected={this.state.startDate} value={this.state.startDate} id="exampleDate" onSelect={this.handleStartDate} />
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
                            <Col >
                                <ButtonToggle color="success" onClick={this.handleFormSubmit} >Submit</ButtonToggle>
                            </Col>
                        </FormGroup>
                        {' '}
                    </Form>
                </Container>
                <br></br>

                <Container style={{ border: '2px solid black' }}>
                    {/* <Scrollbar>
    <div class="scroll-content">
        your contents here...
    </div>
    <div class="scrollbar-track scrollbar-track-x">
        <div class="scrollbar-thumb scrollbar-thumb-x"></div>
    </div>
    <div class="scrollbar-track scrollbar-track-y">
        <div class="scrollbar-thumb scrollbar-thumb-y"></div>
    </div>
</Scrollbar> */}
                    <Table responsive bordered striped dark  > <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>
                                <Button color="primary" onClick={this.handlePrevious}>Previous</Button>
                            </th>
                            <th colSpan='3' style={{ textAlign: "center" }}>
                                <DatePicker selected={this.state.present} onSelect={this.handlePresent} value={this.state.present} />
                            </th>
                            <th style={{ textAlign: "center" }}>
                                <Button color="primary" onClick={this.handleNext}>Next</Button>
                            </th>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "center" }}>#</th>
                            <th style={{ textAlign: "center" }}>Title</th>
                            <th style={{ textAlign: "center" }}>Start Time</th>
                            <th style={{ textAlign: "center" }}>End Time</th>
                            <th style={{ textAlign: "center" }}>Duration</th>
                        </tr>
                    </thead>
                        {/* <RSC  style={{ width: 250, height: 250 }}> */}

                        <Report date={moment(this.state.present).format('YYYY-MM-DD')} username={this.props.username}></Report>
                        {/*  </RSC> */}
                    </Table>
                </Container>
            </Container>

        )
    }
}