import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import DishesReducer from './DishesReducer';
import MyGiftsReducer from './MyGiftsReducer';


export default combineReducers({
    AppReducer,
    DishesReducer,
    MyGiftsReducer    
});