//-----------------------------------
//IMPORTS
//-----------------------------------
import { UNIQUE_STOCK_LOADING, GET_UNIQUE_STOCK } from '../actions/types';

const initialState = {
    uniqueStock: [],
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_UNIQUE_STOCK:
                return {
                    ...state,
                    uniqueStock: action.payload,
                    loading: false
                }
        case UNIQUE_STOCK_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;

    }
}
