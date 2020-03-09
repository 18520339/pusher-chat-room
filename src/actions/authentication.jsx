/* jshint esversion: 10 */
/* eslint-disable */

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator, key } from '../config';
import { HmacSHA1 } from 'crypto-js';

import * as types from '../constants';
import { alertError } from '../functions';
import { getRooms } from './rooms';

export const signOut = () => {
	return { type: types.SIGN_OUT };
};

export const signUp = (name, email, password) => (dispatch, getState) => {
	const chatkit = getState().chatkit;
	const id = HmacSHA1(email + '@!?#?' + password, key).toString();
	const avatarURL = `https://avatars.dicebear.com/v2/avataaars/${name}.svg?options[eyes][]=squint&options[eyebrow][]=raised&options[mouth][]=smile`;

	chatkit
		.createUser({ id, name, avatarURL })
		.then(() => alert('User created successfully'))
		.catch(err => alertError('Error on sign up', err));
};

export const signIn = (email, password) => {
	return (dispatch, getState) => {
		const chatkit = getState().chatkit;
		const id = HmacSHA1(email + '@!?#?' + password, key).toString();

		chatkit
			.getUser({ id })
			.then(() => dispatch({ type: types.SIGN_IN, userId: id }))
			.catch(err => alertError('Error on sign in', err));
	};
};

export const connect = userId => (dispatch, getState) => {
	const chatManager = new ChatManager({
		instanceLocator,
		userId,
		tokenProvider: new TokenProvider({ url: tokenUrl })
	});
	chatManager
		.connect({
			onRoomUpdated: room => {
				dispatch({ type: types.UPDATE_ROOM, room });
			},
			onAddedToRoom: room => {
				if (room.isPrivate) {
					const { currentUser } = getState();
					dispatch(getRooms(currentUser));
				}
			}
		})
		.then(currentUser => {
			dispatch({ type: types.CONNECT, currentUser });
			dispatch(getRooms(currentUser));
		})
		.catch(err => alertError('Error on connection', err));
};

/* eslint-enable */
