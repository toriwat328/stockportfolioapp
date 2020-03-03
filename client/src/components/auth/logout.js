//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import  PropTypes from 'prop-types';


//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
export class Logout extends Component {
    static propsTypes = {
        logout: PropTypes.func.isRequired
    } 

//-----------------------------------
// RENDER
//-----------------------------------
    render(){
        return (
            <Fragment>
               <NavLink onClick={this.props.logout} href="#">
                   Logout
               </NavLink>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout);
