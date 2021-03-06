/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { HmacSHA1 } from 'crypto-js';

import { instanceLocator, tokenUrl, key } from '../config';
import { AVATAR_API_URL, AVATAR_OPTIONS } from '../api';

import * as types from '../constants';
import { alertError } from '../utils';

import { getRooms } from './roomEntry';
import { createPrivateRoom } from './roomCreate';
import { filterRooms } from './controls';

export const signOut = () => (dispatch, getState) => {
	if (window.confirm('Bạn có chắc chắn muốn thoát không ?')) {
		const currentUser = getState().currentUser;
		dispatch({ type: types.SIGN_OUT });
		currentUser.disconnect();
	}
};

export const signUp = (
	name,
	email,
	password,
	avatarURL = '',
	appAuth = false
) => {
	return (dispatch, getState) => {
		const chatkit = getState().chatkit;
		const id = HmacSHA1(`${email}@!?#?${password}`, key).toString();

		if (avatarURL === '')
			avatarURL = `${AVATAR_API_URL}/avataaars/${name}.svg?${AVATAR_OPTIONS}`;

		chatkit
			.createUser({ id, name, avatarURL })
			.then(() => {
				const confirm = 'Tạo tài khoản thành công, đăng nhập ngay ?';
				if (location.pathname === '/sign-up')
					if (!window.confirm(confirm)) return;
				dispatch(signIn(email, password));
			})
			.catch(err => {
				const isExistErr = 'services/chatkit/user_already_exists';
				const confirm = 'Tài khoản bạn đã tồn tại, đăng nhập ngay ?';
				if (err.error === isExistErr && appAuth) {
					if (location.pathname === '/sign-up')
						if (!window.confirm(confirm)) return;
					dispatch(signIn(email, password));
					return;
				}
				alertError('Error on signing up', err);
			});
	};
};

export const signIn = (email, password) => (dispatch, getState) => {
	const chatkit = getState().chatkit;
	const id = HmacSHA1(`${email}@!?#?${password}`, key).toString();

	chatkit
		.getUser({ id })
		.then(() => dispatch({ type: types.SIGN_IN, userId: id }))
		.catch(err => alertError('Error on sign in', err));
};

export const connect = userId => (dispatch, getState) => {
	const chatManager = new ChatManager({
		instanceLocator,
		userId,
		tokenProvider: new TokenProvider({ url: tokenUrl })
	});
	chatManager
		.connect({
			onRoomUpdated: room => dispatch({ type: types.UPDATE_ROOM, room }),
			onAddedToRoom: room => {
				const currentUser = getState().currentUser;
				dispatch(getRooms(currentUser));
			},
			onPresenceChanged: () => {
				const { name, status, isPrivate } = getState().roomFilter;
				dispatch(filterRooms(name, status, isPrivate));
			}
		})
		.then(currentUser => {
			dispatch({ type: types.CONNECT, currentUser });
			dispatch(getRooms(currentUser));
		})
		.then(() => {
			const chatkit = getState().chatkit;
			chatkit
				.getUsers()
				.then(users => {
					users.forEach(user => dispatch(createPrivateRoom(user)));
				})
				.catch(err => alertError('Error on getting all users', err));
		})
		.catch(err => alertError('Error on connection', err));
};

/* eslint-enable */
