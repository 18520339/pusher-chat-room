/* jshint esversion: 10 */
/* eslint-disable */

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import chatkit from './chatkit';
import screen from './screen';
import { currentUser, roomUsers, typingUsers } from './users';
import { rooms, roomActive } from './rooms';
import { messages, isLoading, showPicker } from './messages';

const rootReducer = combineReducers({
	chatkit,
	screen,
	rooms,
	roomActive,
	messages,
	isLoading,
	showPicker,
	currentUser,
	roomUsers,
	typingUsers
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

/* eslint-enable */
