import { combineReducers } from 'redux';
import stockReducer from './stockReducer';
import uniqueStockReducer from './uniqueStockReducer';

export default combineReducers({
    stock: stockReducer,
    uniqueStock: uniqueStockReducer
});
