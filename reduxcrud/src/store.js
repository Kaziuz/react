// este archivo no cambio sigue siendo el mismo siempre
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// esta carpeta hay que crearla siempre o sino marca un error
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) );

export default store;
