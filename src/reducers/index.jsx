/* jshint esversion: 10 */
/* eslint-disable */

import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '@andyet/simplewebrtc';

import chatkit from './chatkit';
import authentication from './authentication';
import notification from './notification';
import videoCall from './videoCall';

import { isLoading, justLoadMore, messages, images } from './messages';
import { currentUser, typingUsers, roomUsers } from './users';
import { rooms, roomActive } from './rooms';

import {
	userSort,
	roomFilter,
	showPicker,
	showCarousel,
	showUsersBar
} from './controls';

const rootReducer = combineReducers({
	simplewebrtc: reducer,
	authentication,
	notification,
	justLoadMore,
	showCarousel,
	showUsersBar,
	currentUser,
	typingUsers,
	roomActive,
	roomFilter,
	showPicker,
	videoCall,
	roomUsers,
	isLoading,
	userSort,
	messages,
	chatkit,
	images,
	rooms
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	{ simplewebrtc: {} },
	composeEnhancer(applyMiddleware(thunk))
);

export default store;

/* eslint-enable */
