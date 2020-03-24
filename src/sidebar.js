import React from "react";
import { slide as Menu } from "react-burger-menu";
import './styles.css'
import { Label, Navbar, NavItem } from 'reactstrap'
import { Route, Switch, Link } from 'react-router-dom'
import ActivityTracker from './component/activityTracker'
import Reports from './reports'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Navbar>
                    <NavItem>
                        <Label ><h2>Welcome : {this.props.username}</h2></Label>
                    </NavItem>
                    <NavItem>
                        <button onClick={this.props.logout} style={{ backgroundColor: "white", color: "#282c34" }} className="LogoutBtn">LOGOUT</button>
                    </NavItem>
                </Navbar>


                <Menu >
                    <Link to="/activities" >activities</Link>
                    <Link to="/report">report</Link>
                </Menu>
                <Switch>
                    <Route path="/activities">
                        <ActivityTracker username={this.props.username} password={this.props.password} />
                    </Route>
                    <Route path="/report">
                        <Reports username={this.props.username} />
                    </Route>
                </Switch>
            </div>
        );
    }
};
export default Sidebar