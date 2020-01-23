import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import DishesReducer from './DishesReducer';


export default combineReducers({
    AppReducer,
    DishesReducer    
});