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
import { register } from '../../actions/authActions.js';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions.js';

//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
        redirect: false
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // CHECK FRO REGISTER ERROR
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        // IF AUTHENTICATED CLOSE MODAL
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
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // CREATE USER OBJECT AND PASS IT UNTO REGISTER FUNCTION TO REGISTER USER
        const newUser = {
            name,
            email,
            password
        };

        // ATTEMPT TO REGISTER WITH USER INPUT
        this.props.register(newUser)


    }
//-----------------------------------
// RENDER
//-----------------------------------
    render(){
        // ATTEMPT TO GET USER TO BE REDIRECTED AFTER BEING AUTHENTICATED WHEN LOGGING IN  -> NOT WORKING
        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to='/portfolio' />;
        }

        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? (<Alert color="danger">{ this.state.msg }</Alert>) : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
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
                                >Register</Button>
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
