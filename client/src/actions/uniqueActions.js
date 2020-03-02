import axios from 'axios';
import { UNIQUE_STOCK_LOADING, GET_UNIQUE_STOCK } from './types';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;

export const getUniqueStocks = () => dispatch => {
    dispatch({ type: UNIQUE_STOCK_LOADING });
    axios.get('/stocks')
        .then(async res => {
            const uniqueSymbols = {}
            let final

            for(let i = 0; i <= res.data.length-1; i++){
                let symbol = res.data[i].symbol
                console.log(symbol);
                if(!uniqueSymbols[symbol]){
                    uniqueSymbols[symbol] = {};
                    uniqueSymbols[symbol].shares = res.data[i].qtyshares;
                 final = await fetch('https://cloud.iexapis.com/stable/stock/' + symbol + '/quote?token=' + apikey)
                            .then(response => {
                                return response.json()
                            }).then(json => {
                                    uniqueSymbols[symbol].latestPrice = json.latestPrice;
                                    uniqueSymbols[symbol].open = json.open;
                                    uniqueSymbols[symbol].diff = uniqueSymbols[symbol].latestPrice -= uniqueSymbols[symbol].open
                                    return uniqueSymbols
                            }).catch(err => console.log(err))
                }else {
                    uniqueSymbols[symbol].shares += res.data[i].qtyshares;
                }
            }


            return final;

        })
        .then(res => dispatch({
            type: GET_UNIQUE_STOCK,
            payload: res
        }))
        .catch(err => console.log(err))
}
