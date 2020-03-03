//-----------------------------------
//IMPORTS
//-----------------------------------
import { GET_STOCK, BUY_STOCK, STOCK_LOADING, BUY_STOCK_FAIL } from '../actions/types';

const initialState = {
    stocks: [],
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_STOCK:
            return {
                ...state,
                stocks: action.payload,
                loading: false
            }
        case BUY_STOCK:
            return {
                ...state,
                stocks: [action.payload, ...state.stocks]
            }

        case STOCK_LOADING:
            return {
                ...state,
                loading: true
            }

        case BUY_STOCK_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;

    }
}
