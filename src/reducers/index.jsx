/* jshint esversion: 10 */
/* eslint-disable */

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import screen from './screen';
import { currentUser, usersTyping } from './users';
import { rooms, roomActive } from './rooms';
import { messages, isLoading } from './messages';

const rootReducer = combineReducers({
	screen,
	rooms,
	roomActive,
	messages,
	isLoading,
	currentUser,
	usersTyping
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

/* eslint-enable */
