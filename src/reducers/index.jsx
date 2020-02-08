/* jshint esversion: 10 */
/* eslint-disable */

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { screenInfo, isLoading } from './screen';
import { currentUser, usersTyping } from './users';
import { roomActive, currentRooms } from './rooms';
import messages from './messages';

const rootReducer = combineReducers({
	screenInfo,
	isLoading,
	currentUser,
	usersTyping,
	roomActive,
	currentRooms,
	messages
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

/* eslint-enable */
