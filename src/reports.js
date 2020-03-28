import React, { Component } from "react";
import moment from 'moment';
import { Table, Container } from 'reactstrap';
import axios from './axios';
import { toast } from 'react-toastify';
import RSC from "react-scrollbars-custom";

export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userReport: null
        }
        this.obj = {
            0: {
                id: '0',
                date: null,
                count: 0,
                duration: 0
            },
            1: {
                id: '1',
                date: null,
                count: 0,
                duration: 0
            },

            2: {
                id: '2',
                date: null,
                count: 0,
                duration: 0
            },
            3: {
                id: '3',
                date: null,
                count: 0,
                duration: 0
            },
            4: {
                id: '4',
                date: null,
                count: 0,
                duration: 0
            },
            5: {
                id: '5',
                date: null,
                count: 0,
                duration: 0
            },
            6: {
                id: '6',
                date: null,
                count: 0,
                duration: 0
            },
            7: {
                id: '7',
                date: null,
                count: 0,
                duration: 0
            },
        }
    }

    componentDidMount() {
        axios.get('/users/userReport/' + this.props.username
        ).then((res) => {
            this.setState({ userReport: res })
            toast.success("user report recieved", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }).catch((err) => {
            toast.warn('error recieved from backend server', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            return;
        })
    }

    render() {
        if (this.state.userReport) {
            Object.keys(this.state.userReport.data).sort().map((date, index) => {
                this.obj[this.state.userReport.data[date].id].date = this.state.userReport.data[date].date;
                this.obj[this.state.userReport.data[date].id].count = this.state.userReport.data[date].count
                this.obj[this.state.userReport.data[date].id].duration = this.state.userReport.data[date].duration
            })
        }


        return (
            <div>
                <Table bordered striped dark > <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Count of Activity</th>
                        <th scope="col">Total Duration</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>{this.obj[0].id}</td>
                            <td>{moment(new Date()).format('L')}</td>
                            {this.obj[0].count > 0 ? (<td>{this.obj[0].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[0].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>{this.obj[1].id}</td>
                            <td>{moment(new Date()).subtract(1, 'days').format('L')}</td>
                            {this.obj[1].count > 0 ? (<td>{this.obj[1].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[1].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{moment(new Date()).subtract(2, 'days').format('L')}</td>
                            {this.obj[2].count > 0 ? (<td>{this.obj[2].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[2].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{moment(new Date()).subtract(3, 'days').format('L')}</td>
                            {this.obj[3].count > 0 ? (<td>{this.obj[3].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[3].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{moment(new Date()).subtract(4, 'days').format('L')}</td>
                            {this.obj[4].count > 0 ? (<td>{this.obj[4].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[4].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{moment(new Date()).subtract(5, 'days').format('L')}</td>
                            {this.obj[5].count > 0 ? (<td>{this.obj[5].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[5].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>{moment(new Date()).subtract(6, 'days').format('L')}</td>
                            {this.obj[6].count > 0 ? (<td>{this.obj[6].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[6].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>{moment(new Date()).subtract(7, 'days').format('L')}</td>
                            {this.obj[7].count > 0 ? (<td>{this.obj[7].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[7].duration}{"   hrs"}</td>
                        </tr>
                    </tbody>
                </Table>
            </div >);
    }
}