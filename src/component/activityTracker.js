import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Col, Button, Form, FormGroup, Label, Input, FormText, ButtonToggle, Container } from 'reactstrap';
import { Table } from 'reactstrap';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import 'react-datepicker/dist/react-datepicker.css';
import DisplayActivities from './displayActivities';
import moment from 'moment';

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
                    date: null
                }]
            }],
            title: null,
            startDate: new Date(),
            startTime: moment().startOf('day'),
            endTime: moment().endOf("day"),
            toggle: false
        }
    }

    handleChangeActivity = (e) => {
        this.setState({
            title: e.target.value
        });
    };


    handleStartDate = date => {
        this.setState({
            startDate: date
        });
    }
    handleStartTime = (e) => {
        this.setState({ startTime: e.target.value });
    }

    handleEndTime = (e) => {
        if (this.state.startTime <= e.target.value)
            this.setState({ endTime: e.target.value });
        else {
            alert("enter valid end time");
        }
    }
    componentDidMount() {
        console.log("activity tracker cdm");
        // this.props.history.push('/dashboard/login/activitytracker');
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        if (this.state.startTime > this.state.endTime) {
            alert("Please enter valid end time");
            return;
        }
        else if (this.state.title === null) {
            alert("Please enter title");
            return;
        }
        // this.setState({ toggle: true });
        let index = 0;
        let items = JSON.parse(localStorage.getItem(this.props.username));
        let flag = 0;
        console.log("adsfdsafasdfasdf");
        console.log(items)
        console.log("afterafter");
        if (items.tasks) {
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
                date: moment(this.state.startDate).format('L'),
                duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                title: this.state.title
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
                    date: moment(this.state.startDate).format('L'),
                    duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                    title: this.state.title
                }]
            }
            await localStorage.setItem(this.props.username, JSON.stringify(obj));
            await this.setState({
                title: null,
                startTime: null,
                endTime: null,
                startDate:null
            })

        }
    }
    handleShowData = () => {
        this.setState({ toggle: !this.state.toggle });
    }
    render() {
        const report = JSON.parse(localStorage.getItem(this.props.username));
        let hm = {};
        if (report.tasks)
            report.tasks.map((el, key) => {
                if (hm[el.date] === undefined) {
                    hm[el.date] = [];
                    hm[el.date].push(el);
                }
                else {
                    hm[el.date].push(el);
                }
            });
        console.log(hm);
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', alignContent: 'center' }}>
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
                                <DatePicker value={this.state.startDate}selected={this.state.startDate} id="exampleDate" onSelect={this.handleStartDate} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelect" sm={2}>StartTime</Label>
                            <Col sm={10}>
                                <TimePickerComponent value={this.state.startTime} placeholder="Select a Time" id="exampleSelect" onChange={this.handleStartTime} format={'HH:mm'} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelectMulti" sm={2}>End Time</Label>
                            <Col sm={10}>
                                <TimePickerComponent placeholder="Select a Time"value={this.state.endTime} id="exampleSelectMulti" onChange={this.handleEndTime} format={'HH:mm'} />
                            </Col>
                        </FormGroup>
                        <ButtonToggle color="success" onClick={this.handleFormSubmit} >Submit</ButtonToggle>{' '}
                    </Form>
                    <Button onClick={this.handleShowData}>Display Activities</Button>
                </div>
                <br></br>
                <div style={{ flex: '6', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', alignContent: 'center' }}>
                    {this.state.toggle ? (
                        // {
                        Object.keys(hm).map((date, index) => {
                            return (
                                <Container>
                                    <br></br>
                                    {date}
                                    <table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {hm[date].map((el, key) => {
                                            let b = moment(el.date);
                                            let a = moment(new Date())
                                            if (a.diff(b, 'days') <= 7)
                                                return (
                                                    
                                                        <tr>
                                                            <td>{el.title}</td>
                                                            <td>{el.duration}</td>
                                                        </tr>
                                                    )
                                        }
                                        
                                        )
                                        }</tbody>
                                    </table>
                                
                                </Container>
                            )
                        })
                        // }
                    ) : null}
                </div>
            </div>
        )
    }
}