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
                    duration: null,
                    startTime: null,
                    endTime: null,
                    date: null
                }]
            }],
            title: null,
            startDate: new Date(),
            startTime: moment.utc().startOf('day'),
            // endTime: moment.utc().endOf('day'),
            endTime: null,
            present: new Date(),
            display: moment.utc(moment()),
            toggle: true
        }
    }

    handleChangeActivity = (e) => {
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
        await this.setState({ startTime: moment.utc(e.target.value) });
        console.log("Start time is :::::::  ++++++===============>>>>>>" + moment.utc(this.state.startTime).format('L'))
    }

    handleEndTime = async (e) => {

        await this.setState({ endTime: moment.utc(e.target.value) });
        console.log("Start time is +  :   " + this.state.endTime)


        //     else {
        //     alert("enter valid end time");
        //     return;
        // }
    }
    componentDidMount() {
        console.log("activity tracker cdm");
        // this.props.history.push('/dashboard/login/activitytracker');
    }
    handlePrevious = () => {
        let date = this.state.present;
        date.setDate(date.getDate() - 1)
        this.setState({ present: date })
        let currDate = date.getDate()
        console.log("previous date is :   :   " + currDate)
        this.setState({ display: date })
    }

    handlePresent = (date) => {
        this.setState({ present: date })
        this.setState({ display: date })
    }

    handleNext = () => {
        let date = this.state.present;
        date.setDate(date.getDate() + 1)
        this.setState({ present: date })
        let currDate = date.getDate()
        console.log(currDate)
        this.setState({ display: date })
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        if (this.state.title === null) {
            alert("Please enter title");
            return;
        }
        // this.setState({ toggle: true });
        let index = 0;
        console.log("USERNAME:" + this.props.username)
        let items = JSON.parse(localStorage.getItem(this.props.username));
        let flag = 0;
        console.log("adsfdsafasdfasdf");
        console.log(items)
        console.log("afterafter");
        // if(items)
        if (items) {
            console.log("entered if");
            console.log(items.tasks.length)
            for (let i = 0; i < items.tasks.length; i++) {
                console.log("for entered")
                console.log(items.username)
                if (items.username === this.props.username) {
                    flag = 1;
                    index = i;
                    console.log("found")
                    break;
                }
                else {
                    flag = 0;
                    index = items.length
                }
            }
        }
        else {
            flag = 0;
            index = 0;
        }
        if (flag === 1) {
            console.log("adfasdf");
            let newItem = items;
            const tasks = {
                date: this.state.startDate,
                // duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))),
                duration: (moment.utc(moment(this.state.endTime).diff(moment(this.state.startTime)))),
                title: this.state.title,
                // startTime: moment(this.state.startTime).format('HH:mm:ss'),
                // endTime: moment(this.state.endTime).format('HH:mm:ss')
                // startTime: moment.utc(this.state.startTime),
                startTime: moment.utc((this.state.startTime)),
                endTime: (moment.utc(this.state.endTime))
            }
            newItem.tasks.push(tasks);
            this.setState({ users: newItem });
            await localStorage.setItem(this.props.username, JSON.stringify(newItem));
        }
        else {
            console.log(index);
            const obj = {
                username: this.props.username,
                password: this.props.password,
                tasks: [{
                    date: this.state.startDate,
                    // duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))),

                    duration: (moment.utc(moment(this.state.endTime).diff(moment(this.state.startTime)))),

                    title: this.state.title,

                    // startTime: moment(this.state.startTime).format('HH:mm:ss'),
                    // endTime: moment(this.state.endTime).format('HH:mm:ss')
                    startTime: moment.utc(this.state.startTime),
                    endTime: moment.utc(this.state.endTime)
                }]
            }
            console.log("USERNAME:" + this.props.username)
            await localStorage.setItem(this.props.username, JSON.stringify(obj));

        }
        await this.setState({
            title: '',
            startDate: new Date(),
            startTime: moment.utc(moment()).startOf('day'),
            endTime: null,
            present: new Date(),
            display: moment.utc(moment()),

        });
        this.setState({ toggle: false })
        this.setState({ toggle: true })
    }
    render() {
        const report = JSON.parse(localStorage.getItem(this.props.username));
        let hm = {};
        if (report)
            if (report.tasks)
                report.tasks.map((el, key) => {
                    if (hm[moment(el.date).format('L')] === undefined) {
                        hm[moment(el.date).format('L')] = [];
                        hm[moment(el.date).format('L')].push(el);
                        console.log(moment(el.date).format('L'))
                    }
                    else {
                        hm[moment(el.date).format('L')].push(el);
                        console.log(moment(el.date).format('L'))

                    }
                });
        console.log("hashmaomahadfjakdf" + hm);

        return (
            <div>
                <Container style={{ border: '2px solid red' }}>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input type="text" placeholder="Enter the Activity" onChange={this.handleChangeActivity} id="exampleEmail" value={this.state.title} />
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
                {
                    this.state.toggle ? <div>
                        <Container style={{ border: '2px solid black' }}>
                            {console.log("entered data dsfasdfadfsafgsfggfsdfghjkjhgfcxcvgbhnjm")}
                            <div className='container'>
                                <div ><Table bordered striped dark > <thead>
                                    <tr>
                                        <th >
                                            <div >
                                                <Button color="primary" onClick={this.handlePrevious}>Previous</Button>
                                            </div>
                                        </th>
                                        <th colSpan='3' >
                                            <div >
                                                <DatePicker selected={this.state.present} onSelect={this.handlePresent} onChange={this.handlePresent} value={this.state.display} />
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
                                    <Report date={moment(this.state.display).format('L')} data={hm} username={this.props.username}></Report>
                                </Table>
                                </div>
                            </div>
                        </Container>
                    </div>
                        : null}
            </div>
        )
    }
}