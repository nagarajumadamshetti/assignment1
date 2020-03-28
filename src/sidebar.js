import React from "react";
import { reveal as Menu } from "react-burger-menu";
import './styles.css'
import { Label, Navbar, NavItem, Button, Nav, NavbarBrand } from 'reactstrap'
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
                <Menu >
                    <Link to="/activities" >activities</Link>
                    <Link to="/report">report</Link>
                </Menu>
                <Navbar color="light" light >
                    <NavbarBrand>
                    </NavbarBrand>
                    <NavItem>
                        <Label ><h2>Welcome : {this.props.username}</h2></Label>
                    </NavItem>
                    <NavItem>
                        <Button onClick={this.props.logout}  >LOGOUT</Button>
                    </NavItem>
                </Navbar>

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