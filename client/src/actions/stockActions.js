import axios from 'axios';
import { GET_STOCK, BUY_STOCK, STOCK_LOADING } from './types';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;

export const buyStocks = (stock) => dispatch => {
    axios.post('/stocks', stock)
        .then(res => dispatch({
            type: BUY_STOCK,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const getStocks = (stock) => dispatch => {
    axios.get('/stocks', stock)
        .then(res => dispatch({
            type: GET_STOCK,
            payload: res.data
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
