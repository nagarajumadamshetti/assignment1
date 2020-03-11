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
            startDate: null,
            startTime: null,
            endTime: null,
            data: null
        }
    }

    handleChangeActivity = (e) => {
        this.setState({
            title: e.target.value
        });
    };


    handleStartDate  = date => {
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
        e.preventDefault()
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
                    console.log("break");
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
                duration: this.state.endTime - this.state.startTime,
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
                    date: this.state.startDate,
                    duration: this.state.endTime - this.state.startTime,
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
                <form >
                    <br>
                    </br>
                    <h1> Enter Activities</h1>
                    <input type="text" placeholder="Enter the Activity" onChange={this.handleChangeActivity} />
                    Start Date:<DatePicker dateFormat='yyyy-mm-dd' selected={this.state.startDate} onSelect={this.handleStartDate} ></DatePicker><br /><br />
                  Start Time:<TimePickerComponent placeholder="Select a Time" onChange={this.handleStartTime} /><br /><br />
                End Time:<TimePickerComponent placeholder="Select a Time" onChange={this.handleEndTime} /><br /><br />
                    <button onClick={this.handleFormSubmit} >Submit</button><br /><br />
                    <tr>
                        {report.tasks.map((el, key) => {
                            let a = moment(el.date);
                            let b = moment(new Date());
                            if (a.diff(b) <= 7)
                                return <tr><td key={key}>> {el.title}      {el.duration}     {el.date}</td></tr>
                        })}
                    </tr>

                </form>
            </div>
        )
    }
}