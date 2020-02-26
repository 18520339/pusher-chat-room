/* jshint esversion: 10 */
/* eslint-disable */

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import chatkit from './chatkit';
import screen from './screen';

import { messages, isLoading } from './messages';
import { currentUser, typingUsers, roomUsers } from './users';
import { rooms, roomActive } from './rooms';
import { roomFilter, userSort, showPicker, showUsersBar } from './controls';

const rootReducer = combineReducers({
	chatkit,
	screen,
	messages,
	isLoading,
	currentUser,
	typingUsers,
	roomUsers,
	rooms,
	roomActive,
	roomFilter,
	userSort,
	showPicker,
	showUsersBar
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

/* eslint-enable */
