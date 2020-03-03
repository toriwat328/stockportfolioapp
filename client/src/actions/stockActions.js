//-----------------------------------
//IMPORTS
//-----------------------------------
import axios from 'axios';
import { tokenConfig } from './authActions';
import { GET_STOCK, BUY_STOCK, BUY_STOCK_FAIL } from './types';
import { returnErrors } from './errorActions';



//-----------------------------------
// STOCK ACTIONS
//-----------------------------------

//BUY STOCKS WHEN AUTHORIZED
export const buyStocks = (stock) => (dispatch, getState) => {
    axios.post('auth/stocks', stock, tokenConfig(getState))
        .then(res => dispatch({
            type: BUY_STOCK,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'BUY_STOCK_FAIL'));
            dispatch({
                type: BUY_STOCK_FAIL
            });
        });
}

//GET STOCKS WHEN AUTHORIZED
export const getStocks = () => (dispatch, getState) => {
    axios.get('auth/stocks', tokenConfig(getState))
        .then(res => {
            return res.data.stocks
        })
        .then(res => dispatch({
            type: GET_STOCK,
            payload: res
        }))
        .catch(err => console.log(err))
}
