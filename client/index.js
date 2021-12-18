import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

/**
 * inject app component into 'root' dom element 
 */
ReactDOM.render(<Provider><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
