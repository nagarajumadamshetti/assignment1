import React, { Component } from 'react';
export default class DisplayActivities extends Component {
    render() {
        
        return (
            <div>
                <td>{this.props.title}</td>
                {/* &nsbp; */}
                <td>{this.props.duration}</td>
                {/* &nsbp; */}
                <td>{this.props.date}</td>
            </div>
        );
    }
}