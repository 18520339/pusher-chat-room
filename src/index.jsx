/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './reducers';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery';

import 'material-design-icons/iconfont/material-icons.css';
import './scss/style.scss';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

/* eslint-enable */
