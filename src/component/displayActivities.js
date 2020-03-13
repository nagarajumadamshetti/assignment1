import React, { Component } from 'react';
export default class DisplayActivities extends Component {
    render() {
        return (
            <div>
                <td>{this.props.title}</td>
                <td>{this.props.duration}</td>
                <td>{this.props.date}</td>
            </div>
        );
    }
}