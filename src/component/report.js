import React, { Component } from "react";
import moment from 'moment';
import axios from '../axios';
import { toast } from 'react-toastify';
import RSC from 'react-scrollbars-custom';

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
            axios.get('/users/getActivities/' + this.props.username + '/' + this.props.date
            ).then((res) => {
                this.setState({ userActivities: res })
                toast.info(`${this.props.date}'s data recieved`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
                .catch((err) => {
                    toast.warn(`error in fetching  ${this.props.date}'s data  `, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    return;
                });
    }
    async componentDidMount() {
        await axios.get('/users/getActivities/' + this.props.username + '/' + this.props.date
        ).then((res) => {
            this.setState({ userActivities: res });
            toast.info(`${this.props.date}'s data recieved`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })
            .catch((err) => {
                toast.warn(`error in fetching  ${this.props.date}'s data  `, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                return;
            });

    }

    render() {
        let c = 0;

        let todayActivities = this.state.userActivities;
        if (todayActivities) {

            if (todayActivities.data.length === 0)
                return (
                    <tbody>
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                <h1>No activities found on this date </h1>
                            </td>
                        </tr>
                    </tbody>
                )
            return (

                // <RSC>
                    // {
                    todayActivities.data.map((obj, key) => {
                        c++;

                        return (
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "center" }}>{c}</td>
                                    <td style={{ textAlign: "center" }}>{obj.title}</td>
                                    <td style={{ textAlign: "center" }}> {obj.start_time}</td>

                                    {obj.end_time ? (
                                        <td style={{ textAlign: "center" }}>{obj.end_time}</td>
                                    )
                                        :
                                        (
                                            <td style={{ textAlign: "center" }}>{"no end time"}</td>
                                        )}
                                    {obj.end_time ? (
                                        <td style={{ textAlign: "center" }}>{Math.abs(moment(obj.end_time, 'HH:mm:ss').diff(moment(obj.start_time, 'HH:mm:ss')) / 3600000)}</td>
                                    )
                                        :
                                        (
                                            <td style={{ textAlign: "center" }}>{"not a time"}</td>
                                        )}
                                </tr>
                            </tbody>
                        )
                    })
                // }
                // {/* </RSC> */}
                )
        }
        else {
            return (
                <tbody>
                    <tr>
                        <td colSpan="5" >
                            <h1>No activities found </h1>
                        </td>
                    </tr>
                </tbody>
            )
        }

    }
}
export default Output;