import { GET_STOCK, BUY_STOCK } from '../actions/types';

const initialState = {
    stocks: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_STOCK:
            return {
                ...state,
                stocks: action.payload
            }
        case BUY_STOCK:
            return {
                ...state,
                stocks: [action.payload, ...state.stocks]
            }
        default:
            return state;

    }
}
