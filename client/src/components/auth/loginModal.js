//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import{
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions.js';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions.js'


//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null,
        redirect: false
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // CHECK FOR REGISTER ERROR -> IF LOGIN FAIL THEN UPDATE MSG STATE TO CORRESPONDING ERROR
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        // IF AUTHENTICATED, CLOSE MODAL
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();


            }
        }
    }

    toggle = () => {
        // CLEAR ERRORS
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        // AS USER TYPES IN FORM, WHAT IS BEING TYPED IS THE VALUE AND THE FIELD IS THE NAME
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        // ATTEMPT TO LOGIN WITH USER INPUT
        this.props.login(user);

    }

//-----------------------------------
// RENDER
//-----------------------------------

    render(){
        // ATTEMPT TO GET USER TO BE REDIRECTED AFTER BEING AUTHENTICATED WHEN LOGGING IN  -> NOT WORKING
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to='/portfolio' />;
        }

        return (

            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? (<Alert color="danger">{ this.state.msg }</Alert>) : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        );

    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
