import { combineReducers } from 'redux';

// reducers
import postsReducer from './postsReducer';
import userReducer from './userReducer';

export default combineReducers({
    //reemplacame: () => 'hola'
    posts:postsReducer,
    users:userReducer
});