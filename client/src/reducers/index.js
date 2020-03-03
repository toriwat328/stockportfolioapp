//-----------------------------------
//IMPORTS
//-----------------------------------
import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import uniqueStockReducer from './uniqueStockReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    stock: stockReducer,
    uniqueStock: uniqueStockReducer,
    error: errorReducer,
    auth: authReducer
});
