import React, { Component } from 'react';
import DatePicker from "react-datepicker";
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
            startTime: null,
            endTime: null,
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
        this.setState({ endTime: e.target.value });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({ toggle: true });
        let index = 0;
        let items = JSON.parse(localStorage.getItem(this.props.username));
        let flag = 0;
        console.log("adsfdsafasdfasdf");
        console.log(items)
        console.log("afterafter");
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
                date: moment(this.state.startDate).format('L'),
                duration: moment.utc(moment(this.state.endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
                title: this.state.title
            }
            newItem.tasks.push(tasks);
            this.setState({ users: newItem });
            localStorage.setItem(this.props.username, JSON.stringify(newItem));
            // this.setState({ data: JSON.parse(localStorage.getItem(this.props.username)) })
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
            localStorage.setItem(this.props.username, JSON.stringify(obj));
        }
    }
    render() {
        const report = JSON.parse(localStorage.getItem(this.props.username));
        // console.log(report[2])
        // report.map((el,key))
        return (
            <div >
                <style>{`
                          table{
                                border:1px solid black;
                            }
                            .content {
                                max-width: 500px;
                                margin: auto;
                              }
                              .row {
                                border:1px solid black; 
                            }
                        `}</style>
                <form className="content">
                    <h1> Enter Activities</h1>
                    <input type="text" placeholder="Enter the Activity" onChange={this.handleChangeActivity} />
                    Start Date:<DatePicker selected={this.state.startDate} onSelect={this.handleStartDate} ></DatePicker><br /><br />
                  Start Time:<TimePickerComponent placeholder="Select a Time" onChange={this.handleStartTime} format={'HH:mm'} /><br /><br />
                End Time:<TimePickerComponent placeholder="Select a Time" onChange={this.handleEndTime} format={'HH:mm'} /><br /><br />
                    <button onClick={this.handleFormSubmit} >Submit</button><br /><br />
                    {this.state.toggle ? (<table boder='1'>
                        <tr>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Date</th>
                        </tr>
                        <tr className='row'>
                            {report.tasks.map((el, key) => {
                                let a = moment(el.date);
                                let b = moment(new Date());
                                if (a.diff(b) <= 7)
                                    return <DisplayActivities key={key} title={el.title} duration={el.duration} date={el.date}></DisplayActivities>
                                else
                                    return null;
                            })}
                        </tr>
                    </table>) : null}

                </form>
            </div>
        )
    }
}