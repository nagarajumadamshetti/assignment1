import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Col, Button, Form, FormGroup, Label, Input, FormText, ButtonToggle } from 'reactstrap';
import { Table } from 'reactstrap';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import 'react-datepicker/dist/react-datepicker.css';
import DisplayActivities from './displayActivities';
import moment from 'moment';
import axios from '../axios';

export default class ActivityTracker extends Component {
    constructor(props) {

        super(props);
        this.state = {
            users: [{
                tasks: [{
                    title: null,
                    start_time: null,
                    end_time: null,
                    // duration: null,
                    date: null
                }]
            }],
            title: null,
            startDate: new Date(),
            startTime: new Date(),
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

        let index = 0;
        // let items = JSON.parse(localStorage.getItem(this.props.username));
        let items = null;
        await axios.post('/users/showActivities', {
            username: this.props.username
        }).then((res) => {
            console.log(res);
            console.log("axios get");
            console.log(res.data);
            items = res;
        }).catch((err) => {
            console.log("err");
            return
        })
        // items.map((el,key)=>{
        //     console.log(el.title)
        // })
        let itemsNew=this.state.users.tasks;
        let flag = 0;
        console.log("adsfdsafasdfasdf");
        console.log(items)
        console.log("afterafter");
        if (items) {
            console.log("entered if");
            console.log(items)
            let a, b, c
            let ojb = { a: {}, b: {} }
            flag = 1;
        }
        else {
            console.log("entered else cause there's no data")
            flag = 0;
            index = 0;
        }
        if (flag === 1) {
            console.log("adfasdf");
            let newItem = items;
            itemsNew=items.data
            console.log(itemsNew);
            const tasks = {
                date: moment(this.state.startDate).format('L'),
                start_time: moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                end_time: moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                // duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                title: this.state.title
            }
            itemsNew.push(tasks);
            this.setState({ users: newItem });
            localStorage.setItem(this.props.username, JSON.stringify(newItem));
            await axios.post('/users/submitActivities', {
                actSub: {
                    date: moment(this.state.startDate).format('L'),
                    start_time: moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                    end_time: moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                    // duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                    title: this.state.title
                },
                username: this.props.username
            })
            this.setState({ users: itemsNew })
        }
        else {
            console.log("entered no prev data");
            await axios.post('/users/submitActivities', {
                actSub: {
                    date: moment(this.state.startDate).format('L'),
                    start_time: moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                    end_time: moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                    // duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                    title: this.state.title
                },
                username: this.props.username
            }).then((res) => {
                this.setState({
                    users: [{
                        date: moment(this.state.startDate).format('L'),
                        start_time: moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                        end_time: moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss"),
                        // duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                        title: this.state.title
                    }]
                })
                console.log("data successfully sent");

            })
                .catch((error) => {
                    alert("data not sent");
                })
            // const obj = {
            //     username: this.props.username,
            //     password: this.props.password,
            //     tasks: [{
            //         date: moment(this.state.startDate).format('L'),
            //         duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
            //         title: this.state.title
            //     }]
            // }
            // localStorage.setItem(this.props.username, JSON.stringify(obj));
        }
        // if (items) {
        //     console.log("entered if");
        //     console.log(items.tasks.length)
        //     for (let i = 0; i < items.tasks.length; i++) {
        //         console.log("for entered")
        //         console.log(items.username)
        //         if (items.username === this.props.username) {
        //             flag = 1;
        //             index = i;
        //             console.log("found")
        //             break;
        //         }
        //         else {
        //             flag = 0;
        //             index = items.length
        //         }
        //     }
        // }
        // else {
        //     flag = 0;
        //     index = 0;
        // }
        // if (flag === 1) {
        //     console.log("adfasdf");
        //     let newItem = items;
        //     const tasks = {
        //         date: moment(this.state.startDate).format('L'),
        //         duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
        //         title: this.state.title
        //     }
        //     newItem.tasks.push(tasks);
        //     this.setState({ users: newItem });
        //     localStorage.setItem(this.props.username, JSON.stringify(newItem));
        // }
        // else {
        //     console.log(index);
        //     const obj = {
        //         username: this.props.username,
        //         password: this.props.password,
        //         tasks: [{
        //             date: moment(this.state.startDate).format('L'),
        //             duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
        //             title: this.state.title
        //         }]
        //     }
        //     localStorage.setItem(this.props.username, JSON.stringify(obj));
        // }
    }
    handleShowData = () => {
        this.setState({ toggle: !this.state.toggle });
    }
    render() {
        // const report = JSON.parse(localStorage.getItem(this.props.username));
        const report = this.state.users.tasks;
        let hm = {};
        console.log("report is"+report);
        if (report)
            report.map((el, key) => {
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
                                <Input type="text" placeholder="Enter the Activity" onChange={this.handleChangeActivity} id="exampleEmail" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleDate" sm={5}>StartDate</Label>
                            <Col sm={10}>
                                <DatePicker selected={this.state.startDate} id="exampleDate" onSelect={this.handleStartDate} />
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
                                <div>
                                    <br></br>
                                    {"asdfasdfsd"}
                                    {console.log("displaying activities")}
                                    {date}
                                    <table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Duration</th>
                                            </tr>
                                        </thead>
                                        {hm[date].map((el, key) => {
                                            let duration=moment(el.end_time, "DD/MM/YYYY HH:mm:ss").diff(moment(el.start_time, "DD/MM/YYYY HH:mm:ss")).format("HH:mm:ss");
                                            let b = moment(el.date);
                                            let a = moment(new Date())
                                            if (a.diff(b, 'days') <= 7)
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td>{el.title}</td>
                                                            <td>{duration}</td>
                                                        </tr>
                                                    </tbody>)
                                        })
                                        }
                                    </table>
                                </div>

                            )
                        })
                        // }
                    ) : null}
                </div>
            </div>
        )
    }
}