import React from 'react';
import ReactDOM from 'react-dom';

//redux
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';

// components
import App from './components/App';
import reducers from './reducers';

// creamos nuestro store
const store = createStore(reducers, applyMiddleware(thunk));
        
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
document.getElementById('root'));

