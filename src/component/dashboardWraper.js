import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

export default class DashboardWrapper extends Component {
    componentDidMount() {
        // this.props.history.push('/')
    }
    render() {
        return (<div>
            <Link to='/dashboard'>Dashboard</Link>
        </div>);
    }
}