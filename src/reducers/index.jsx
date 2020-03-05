/* jshint esversion: 10 */
/* eslint-disable */

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '@andyet/simplewebrtc';

import chatkit from './chatkit';
import screen from './screen';
import videoChat from './videoChat';

import { messages, isLoading } from './messages';
import { currentUser, typingUsers, roomUsers } from './users';
import { rooms, roomActive } from './rooms';
import { roomFilter, userSort, showUsersBar, showPicker } from './controls';

const rootReducer = combineReducers({
	simplewebrtc: reducer,
	chatkit,
	screen,
	videoChat,
	messages,
	isLoading,
	currentUser,
	typingUsers,
	roomUsers,
	rooms,
	roomActive,
	roomFilter,
	userSort,
	showUsersBar,
	showPicker
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	{ simplewebrtc: {} },
	composeEnhancer(applyMiddleware(thunk))
);

export default store;

/* eslint-enable */
