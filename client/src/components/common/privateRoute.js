//-----------------------------------
//IMPORTS
//-----------------------------------
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------

//CREATING PRIVATE ROUTE SO THAT IF USER IS NOT AUTH THEY ARE REDIRECTED TO HOMEPAGE
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if(auth.isLoading){
                return <h2>Loading...</h2>
            }else if(!auth.isAuthenticated){
                    return <Redirect to="/" />
            }else {
                return <Component {...props} />
            }

        }}

        />
)



const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps) (PrivateRoute);
