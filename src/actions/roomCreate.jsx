/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { createBrowserHistory } from 'history';
import { HmacSHA1 } from 'crypto-js';

import { key } from '../config';
import { alertError } from '../utils';

import { sendMessage } from './messages';
import { enterRoom } from './roomEntry';

export const createRoom = (name, message) => (dispatch, getState) => {
	const { currentUser, chatkit } = getState();
	chatkit
		.getUsers()
		.then(users => {
			const addUserIds = users.map(user => user.id);
			currentUser
				.createRoom({
					name,
					addUserIds,
					customData: { lastMessage: '' }
				})
				.then(room => {
					const roomId = room.id;
					const history = createBrowserHistory();
					const parts = [];

					if (message.trim()) {
						parts.push({ type: 'text/plain', content: message });
						dispatch(sendMessage(parts, `${roomId}`));
					}
					history.push(roomId);
					dispatch(enterRoom(roomId));
				})
				.catch(err => alertError('Error on creating rooms', err));
		})
		.catch(err => alertError('Error on getting all users', err));
};

export const createPrivateRoom = user => (dispatch, getState) => {
	const { chatkit, currentUser } = getState();
	const { id, name, avatarURL } = currentUser;

	const roomId = HmacSHA1(`${id}${user.id}`, key).toString();
	const otherRoomId = HmacSHA1(`${user.id}${id}`, key).toString();

	const members = [{ id, name, avatarURL }];
	if (user.id !== id)
		members.push({
			id: user.id,
			name: user.name,
			avatarURL: user.avatar_url
		});

	chatkit
		.getRooms({ includePrivate: true })
		.then(rooms => {
			const privateRoomCreated = rooms.some(
				room => room.id === roomId || room.id === otherRoomId
			);
			if (!privateRoomCreated)
				currentUser
					.createRoom({
						id: roomId,
						name: `${name} & ${user.name}`,
						private: true,
						addUserIds: [user.id],
						customData: { lastMessage: '', members }
					})
					.catch(err => {
						alertError('Error on creating private rooms', err);
					});
		})
		.catch(err => alertError('Error on getting all rooms', err));
};

/* eslint-enable */
