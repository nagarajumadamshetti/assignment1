import React, { Component } from "react";
import moment from 'moment';
import { Table, Container } from 'reactstrap';
let c = 1;
let hm = {};

let abc = null;
export default class Reports extends Component {
    constructor(props) {
        super(props);
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
    handleReport = () => {
        const report = JSON.parse(localStorage.getItem(this.props.username));
        console.log("entered handle report")
        if (report)
            if (report.tasks)
                report.tasks.map((el, key) => {
                    // if (hm[moment(el.date).format('L')] === undefined) {
                    //     hm[moment(el.date).format('L')] = [];
                    //     hm[moment(el.date).format('L')].push(el);
                    //     console.log(moment(el.date).format('L'))
                    // }
                    // else {
                    //     hm[moment(el.date).format('L')].push(el);
                    //     console.log(moment(el.date).format('L'))
                    // }
                    let a = moment(new Date())
                    let b = moment(el.date);
                    console.log("el.date is" + b)
                    if (a.diff(b, 'days') <= 7) {
                        this.obj[a.diff(b, 'days')].date = b;
                        this.obj[a.diff(b, 'days')].count += 1;
                        console.log("DURATION:::: " + el.duration)
                        this.obj[a.diff(b, 'days')].duration += el.duration;
                        console.log("DURATION:::: " + el.duration)
                    }
                });
        // Object.keys(hm).map((key, index) => {
        //     hm[key].map((el, key) => {
        //         // let duration=moment(el.end_time, "DD/MM/YYYY HH:mm:ss").diff(moment(el.start_time, "DD/MM/YYYY HH:mm:ss")).format("HH:mm:ss");
        //         let b = moment(el.key);
        //         let a = moment(new Date())
        //         if (a.diff(b, 'days') <= 7) {
        //             obj[a.diff(b, 'days')].date = b;
        //             obj[a.diff(b, 'days')].count += 1;
        //             obj[a.diff(b, 'days')].duration += el.duration;
        //         }
        //     })
        // })
        //     c++;
        //     let count = 0;
        //     let dur = null;
        //     hm[key].map((el) => {
        //         console.log("inside inner loop of reports")
        //         dur += el.duration;
        //         count += 1;
        //         console.log("duration is  " + el.duration)
        //         console.log("duration is:   : :  :" + dur);
        //     })
        //     return (
        //         <tbody>
        //             <tr>
        //                 <td>{c}</td>
        //                 <td>{hm[key]}</td>
        //                 <td>{count}</td>
        //                 <td>{dur}</td>
        //             </tr>
        //         </tbody>)
        // })
    }
    render() {
        const report = JSON.parse(localStorage.getItem(this.props.username));
        console.log("entered handle report")
        if (report)
            if (report.tasks)
                report.tasks.map((el, key) => {
                    if (el.endTime) {
                        let a = moment(new Date())
                        let b = moment(el.date);
                        console.log("el.date is :  :   " + b)
                        if (a.diff(b, 'days') <= 7) {
                            console.log("engered sidifdasdfdfasdfasdfasdf");
                            console.log()
                            this.obj[a.diff(b, 'days')].date = b.format('L');
                            this.obj[a.diff(b, 'days')].count += 1;
                            this.obj[a.diff(b, 'days')].duration += (Math.abs((moment(el.endTime).diff(moment(el.startTime))) / 3600000));

                            console.log(" duratiion increasing" + this.obj[a.diff(b, 'days')].duration)
                            return;
                        }
                        else
                            return
                    }
                }

                );
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
                            {this.obj[0].count ? (<td>{this.obj[0].count}</td>) : (<td>no activities</td>)
                            }
                            {/* <td>{this.obj[0].count}?{this.obj[0].count}:{"no activities"}</td> */}
                            <td>{this.obj[0].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>{this.obj[1].id}</td>
                            <td>{moment(new Date()).subtract(1, 'days').format('L')}</td>
                            {/* <td>{this.obj[1].count}</td> */}
                            {this.obj[1].count ? (<td>{this.obj[1].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[1].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{moment(new Date()).subtract(2, 'days').format('L')}</td>
                            {/* <td>{this.obj[2].count}</td> */}
                            {this.obj[2].count ? (<td>{this.obj[2].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[2].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{moment(new Date()).subtract(3, 'days').format('L')}</td>
                            {/* <td>{this.obj[3].count}</td> */}
                            {this.obj[3].count ? (<td>{this.obj[3].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[3].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{moment(new Date()).subtract(4, 'days').format('L')}</td>
                            {/* <td>{this.obj[4].count}</td> */}
                            {this.obj[4].count ? (<td>{this.obj[4].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[4].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{moment(new Date()).subtract(5, 'days').format('L')}</td>
                            {/* <td>{this.obj[5].count}</td> */}
                            {this.obj[5].count ? (<td>{this.obj[5].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[5].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>{moment(new Date()).subtract(6, 'days').format('L')}</td>
                            {/* <td>{this.obj[6].count}</td> */}
                            {this.obj[6].count ? (<td>{this.obj[6].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[6].duration}{"   hrs"}</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>{moment(new Date()).subtract(7, 'days').format('L')}</td>
                            {/* <td>{this.obj[7].count}</td> */}
                            {this.obj[7].count ? (<td>{this.obj[7].count}</td>) : (<td>no activities</td>)
                            }
                            <td>{this.obj[7].duration}{"   hrs"}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>);
    }
}