//-----------------------------------
//IMPORTS
//-----------------------------------
import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';

//-----------------------------------
// AUTH ACTIONS
//-----------------------------------

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // USER LOADING
    dispatch({ type: USER_LOADING });

    axios.get('/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};



//REGISTER USER
export const register = ({ name, email, password }) => dispatch => {

    // HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // REQUEST BODY
    const body = JSON.stringify({ name, email, password });

    axios.post('/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};




// LOGIN USER
export const login = ({ email, password }) => dispatch => {
    // HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // REQUEST BODY
    const body = JSON.stringify({ email, password });

    axios.post('/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};




 // LOGOUT USER
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};



// SETUP CONFIG/HEADERS AND TOKEN
export const tokenConfig = getState => {
    //  GET TOKEN FROM LOCALSTORAGE
    const token = getState().auth.token;

    // HEADERS
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // IF TOKEN ADD TO HEADER
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
};
