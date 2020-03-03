//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
class JumbotronApp extends Component {
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

// ONLY SHOW THIS COMPONENT WHEN USER IS NOT AUTHENTICATED 
    render(){
        const { isAuthenticated } = this.props.auth;


        return (

            <div>
            { isAuthenticated ? '' :
            <Jumbotron>
                <h1 className="display-3">Hello! Welcome to TCKR</h1>
                <p className="lead">Stock Portfolio App designed for your needs.</p>
                <hr className="my-2" />
                <p>Buy stocks, review your portfolio and see an audit of all your transactions</p>

             </Jumbotron>}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(JumbotronApp);
