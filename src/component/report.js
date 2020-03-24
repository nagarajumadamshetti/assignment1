import React, { Component } from "react";
import moment from 'moment'
class Output extends Component {

    render() {
        let c = 0;
        let output = JSON.parse(localStorage.getItem(this.props.username))
        let dates = Object.keys(this.props.data)
        console.log("dates:  "+dates)
        // console.log(output.activities[this.props.date])moment(this.state.startDate).format('L')
        let bool=dates.includes(moment(this.props.date).format('L'))
        console.log("dates are:  "+moment(this.props.date).format('L'));
        console.log("booollll:  "+bool);
        if(bool)
        {
        return this.props.data[this.props.date].map((obj) => {
            c++
            return (
                <tbody>
                    <tr>
                        <td scope="row">{c}</td>
                        <td>{obj.title}</td>
                        {console.log("title is:   "+obj.title)}
                        <td> {(moment.utc(obj.startTime)).format('HH:mm:ss')}</td>
                        <td>{moment.utc((obj.endTime)).format('HH:mm:ss')}</td>
                        <td>{(moment.utc(obj.duration)).format("HH:mm:ss")}</td>
                    </tr>
                </tbody>
            )
        })
    }
    else
    return( <tbody><tr><td  colSpan="5" ><h1>No activities found on this date </h1></td></tr></tbody>)

    }
}
export default Output;