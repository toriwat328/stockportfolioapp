//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component, Fragment } from 'react';
import RegisterModal from './auth/registerModal';
import LoginModal from './auth/loginModal';
import Logout from "./auth/logout";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import { Switch, Link } from 'react-router-dom';
import Portfolio from './portfolio';
import Transactions from './transactions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from './common/privateRoute';

//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
class AppNavbar extends Component {
    state = {
        isOpen: false

    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

//-----------------------------------
// RENDER
//-----------------------------------

// TO SET NAV LINKS DYNAMICALLY BASED ON USER AUTH -> SET AUTH LINKS AND GUEST LINKS TO VARIABLES AND USER TERNARY OPERATOR TO SHOW CORRESPONDING LINKS

//ADDED USER NAME TO NAV WHEN LOGGED IN

//MADE PORTFOLIO AND TRANSATIONS PRIVATE ROUTES
    render(){
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
            <NavItem href="/portfolio" className="navbar-text mr-3">
                <Link to={'/portfolio'} className="nav-link" >Portfolio</Link>
            </NavItem>
            <NavItem className="navbar-text mr-3">
                <Link to={'/transactions'} className="nav-link">Transactions</Link>
            </NavItem>
            <NavItem className="navbar-text mr-3 mt-2">

                    <strong>{ user ? `Welcome ${user.name}` : ''}</strong>

            </NavItem>
                <NavItem className="navbar-text mr-3">
                    <Logout />
                </NavItem>
                    <LoginModal />
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );
        return (

            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">TCKR</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>


                                { isAuthenticated ? authLinks : guestLinks }

                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
