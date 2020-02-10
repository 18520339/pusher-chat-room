/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './reducers';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

/* eslint-enable */
