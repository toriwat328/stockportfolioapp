import axios from 'axios';
import { tokenConfig } from './authActions';
import { GET_STOCK, BUY_STOCK, STOCK_LOADING } from './types';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;

export const buyStocks = (stock) => (dispatch, getState) => {
    axios.post('auth/stocks', stock, tokenConfig(getState))
        .then(res => dispatch({
            type: BUY_STOCK,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const getStocks = () => (dispatch, getState) => {
    axios.get('auth/stocks', tokenConfig(getState))
        .then(res => {
            console.log(res.data.stocks);
            return res.data.stocks
        })
        .then(res => dispatch({
            type: GET_STOCK,
            payload: res
        }))
        .catch(err => console.log(err))
}

// export const setupUnique = (stock) => dispatch => {
//     axios.post('/stocks', stock)
//         .then(res => dispatch({
//             type: BUY_STOCK,
//             payload: res.data
//         }))
//         .catch(err => console.log(err))
// }
