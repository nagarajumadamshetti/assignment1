import React, { Component } from 'react';
import Login from '../login';
import News from './news';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

export default class Dashboard extends Component {
    componentDidMount() {
        this.props.history.push('/dashboard')
    }
    render() {
        return (<div>
            <Link to='/dashboard/login'>Login</Link>
            <br></br>
            <Link to='/dashboard/news'>News</Link>
        </div>);
    }
}