import React, { Component } from "react";
import moment from 'moment';
import axios from '../axios';

class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userActivities: null,
            date: null
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.date !== this.props.date)
            axios.post('/users/getActivities', {
                username: this.props.username,
                date: this.props.date
            }).then((res) => {
                this.setState({ userActivities: res })
            })
                .catch((err) => {
                    alert("cannot get data from db at report.js");
                    return;
                });
    }
    async componentDidMount() {
        await axios.post('/users/getActivities', {
            username: this.props.username,
            date: this.props.date
        }).then((res) => {
            this.setState({ userActivities: res })
        })
            .catch((err) => {
                alert("cannot get data from db at report.js");
                return;
            });

    }

    render() {
        let c = 0;

        let todayActivities = this.state.userActivities;
        if (todayActivities) {
            return todayActivities.data.map((obj, key) => {
                c++

                return (
                    <tbody>
                        <tr>
                            <td scope="row">{c}</td>
                            <td>{obj.title}</td>
                            <td> {obj.start_time}</td>

                            {obj.end_time ? (
                                <td>{obj.end_time}</td>
                            )
                                :
                                (
                                    <td>{"no end time"}</td>
                                )}
                            {obj.end_time ? (
                                <td>{Math.abs(moment(obj.end_time, 'HH:mm:ss').diff(moment(obj.start_time, 'HH:mm:ss')) / 3600000)}</td>
                            )
                                :
                                (
                                    <td>{"not a time"}</td>
                                )}
                        </tr>
                    </tbody>
                )
            })
        }
        else
            return (
                <tbody>
                    <tr>
                        <td colSpan="5" >
                            <h1>No activities found on this date </h1>
                        </td>
                    </tr>
                </tbody>
            )
    }
}
export default Output;