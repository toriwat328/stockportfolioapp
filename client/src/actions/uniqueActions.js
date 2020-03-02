import axios from 'axios';
import { tokenConfig } from './authActions';
import { UNIQUE_STOCK_LOADING, GET_UNIQUE_STOCK } from './types';
require('dotenv').config()



const apikey = process.env.REACT_APP_IEXAPI;



export const getUniqueStocks = () => (dispatch, getState) => {
    dispatch({ type: UNIQUE_STOCK_LOADING });
    axios.get('auth/stocks', tokenConfig(getState))
            .then(async res => {
    const uniqueSymbols = {}
    let final

    for(let i = 0; i <= res.data.stocks.length-1; i++){
        let symbol = res.data.stocks[i].symbol
        console.log(symbol);
        if(!uniqueSymbols[symbol]){
            uniqueSymbols[symbol] = {};
            uniqueSymbols[symbol].shares = res.data.stocks[i].qtyshares;
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
            uniqueSymbols[symbol].shares += res.data.stocks[i].qtyshares;
        }
    }

        return final

    })
    .then(res => dispatch({
            type: GET_UNIQUE_STOCK,
            payload: res
    }))
    .catch(err => console.log(err))
}
