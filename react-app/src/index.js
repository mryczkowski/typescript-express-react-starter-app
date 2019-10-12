import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import './index.css';
import App from './components/App';
import appReducer from './state/appReducer';
import { getCookie } from './util/storage';
import { parseErr } from './util/client';
import * as serviceWorker from './serviceWorker';

// axios
axios.defaults.headers['x-csrf-token'] = getCookie('my_app.csrf_token');
axios.interceptors.response.use(response => response, parseErr); // used to consolidate errors to a common error object

// redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
