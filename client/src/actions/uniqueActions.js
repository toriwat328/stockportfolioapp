//-----------------------------------
//IMPORTS
//-----------------------------------
import axios from 'axios';
import { tokenConfig } from './authActions';
import { UNIQUE_STOCK_LOADING, GET_UNIQUE_STOCK } from './types';
require('dotenv').config()
const apikey = process.env.REACT_APP_IEXAPI;


//-----------------------------------
// UNIQUE STOCK ACTIONS
//-----------------------------------

// RETURN UNIQUE STOCKS IN PORTFOLIO
// CREATED ASYNC FUNCTION TO RETURN A NEW OBJECT FROM STOCK DATA WHERE TICKER SYMBOLS ONLY APPEAR ONCE AND HAS SHARES BOUGHT PER SYMBOL, LATEST PRICE AND OPENING PRICE FOR PORTFOLIO COMPONENT
export const getUniqueStocks = () => (dispatch, getState) => {
    dispatch({ type: UNIQUE_STOCK_LOADING });
    //GET STOCK DATA OF LOGGED IN USER
    axios.get('auth/stocks', tokenConfig(getState))
            //WHEN WE HAVE THE DATA
            .then(async res => {

            //CREATE VARIABLES AND EMPTY OBJECT
            const uniqueSymbols = {}
            let final

            //LOOP THROUGH STOCK DATA
            for(let i = 0; i <= res.data.stocks.length-1; i++){
                let symbol = res.data.stocks[i].symbol
                //IF SYMBOL IS NOT IN NEW OBJECT
                if(!uniqueSymbols[symbol]){
                    //CREATE A PROPERTY AS THE NAME OF THE SYMBOL BEING ITERATED
                    uniqueSymbols[symbol] = {};
                    //SET PROPERTY VALUE AS THAT STOCKS QTY OF SHARES
                    uniqueSymbols[symbol].shares = res.data.stocks[i].qtyshares;

            // THIS BLOCK OF CODE NEEDS TO BE DONE BEFORE FINAL RETURN
            // FETCH CURRENT SYMBOL'S DATA
             final = await fetch('https://cloud.iexapis.com/stable/stock/' + symbol + '/quote?token=' + apikey)
                        .then(response => {
                            return response.json()
                        }).then(json => {
                                //CREATE PROPERTIES WITHIN SYMBOL PROPERTY AND SET VALUE TO API DATA VALUE FOR LATEST PRICE AND OPENING PRICE
                                uniqueSymbols[symbol].latestPrice = json.latestPrice;
                                uniqueSymbols[symbol].open = json.open;
                                let latest = uniqueSymbols[symbol].latestPrice;
                                let open = uniqueSymbols[symbol].open;

                                // TO SEE IF PRICES DROPPED OR ROSE CREATE DIFF VALUE AND SET IT EQUAL TO THE DIFFERENCE BETWEEN LATEST PRICE AND OPENING PRICE
                                uniqueSymbols[symbol].diff = latest - open

                                return uniqueSymbols
                        }).catch(err => console.log(err))
                }else {
                    //IF SYMBOL IS ALREADY IN NEW OBJECT JUST ADD ITS QTY SHARES VALUE TO NEW OBJECT SHARES VALUE
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
