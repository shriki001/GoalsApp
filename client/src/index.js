import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/**
 * inject app component into 'root' dom element 
 */
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
