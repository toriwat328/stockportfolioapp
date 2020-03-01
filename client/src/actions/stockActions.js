import axios from 'axios';
import { GET_STOCK, BUY_STOCK } from './types';

export const getStocks = () => dispatch => {
    axios.get('/stocks')
        .then(res => dispatch({
            type: GET_STOCK,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const buyStocks = (stock) => dispatch => {
    axios.post('/stocks', stock)
        .then(res => dispatch({
            type: BUY_STOCK,
            payload: res.data
        }))
        .catch(err => console.log(err))
}
