import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Portfolio from './portfolio';
import Transactions from './transactions';


class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render(){
        return (

            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">TCKR</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav>
                                <NavLink>
                                    <Link to={'/portfolio'} className="nav-link">Portfolio</Link>
                                </NavLink>
                                <NavLink href="#">
                                    <Link to={'/transactions'} className="nav-link">Transactions</Link>
                                </NavLink>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path='/portfolio' component={Portfolio} />
                    <Route path='/transactions' component={Transactions} />
                </Switch>
            </div>
        )
    }
}

export default AppNavbar;
