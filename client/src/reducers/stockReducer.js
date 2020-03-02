import { GET_STOCK, BUY_STOCK, STOCK_LOADING, GET_UNIQUE_STOCK } from '../actions/types';

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
        case GET_UNIQUE_STOCK:
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
        default:
            return state;

    }
}
