// importamos combine reducer que va uniendo los reducer segun amos agregando mas
import { combineReducers } from 'redux';
import productosReducer from './productosReducers';

export default combineReducers({
    productos:productosReducer
});