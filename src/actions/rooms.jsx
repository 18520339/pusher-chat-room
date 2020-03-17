/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { key } from '../config';
import { HmacSHA1 } from 'crypto-js';

import * as types from '../constants';
import { alertError, getPrivateRoom } from '../utils';

import { showNotificationToast, showNotification } from './notification';
import { sendMessage, fetchLastMessage } from './messages';

export const onSetRoomActive = (roomActive, currentUserId) => {
	const { isPrivate, users } = roomActive;
	if (isPrivate) {
		const { name, status, avatarURL } = getPrivateRoom(
			roomActive,
			currentUserId,
			false
		);
		return { ...roomActive, users, name, status, avatarURL };
	}
	return roomActive;
};

export const getRooms = currentUser => (dispatch, getState) => {
	currentUser
		.getJoinableRooms()
		.then(unjoinedRooms => {
			const rooms = [...currentUser.rooms, ...unjoinedRooms];
			dispatch({ type: types.GET_ROOMS, rooms });
		})
		.catch(err => alertError('Error on getting rooms', err));
};

export const enterRoom = roomId => (dispatch, getState) => {
	const currentUser = getState().currentUser;
	if (!currentUser.id) return;

	dispatch(showNotificationToast());
	dispatch({ type: types.CLEAR_MESSAGE });

	currentUser
		.subscribeToRoomMultipart({
			roomId,
			messageLimit: 10,
			hooks: {
				onMessage: message => {
					setTimeout(() => {
						dispatch(fetchLastMessage());
						dispatch(showNotification(message));
					}, 250);

					if (location.hash.substr(7) === roomId) {
						dispatch({ type: types.ON_MESSAGE, message });
						currentUser.setReadCursor({
							roomId,
							position: message.id
						});
					}
				},
				onUserStartedTyping: user => {
					const { roomActive } = getState();
					if (roomActive.id === roomId)
						dispatch({ type: types.USER_STARTED_TYPING, user });
				},
				onUserStoppedTyping: user => {
					const { roomActive } = getState();
					if (roomActive.id === roomId)
						dispatch({ type: types.USER_STOPED_TYPING, user });
				},
				onPresenceChanged: () => {
					const { currentUser, roomActive } = getState();
					if (roomActive.id === roomId)
						dispatch({
							type: types.PRESENCE_CHANGED,
							roomActive: onSetRoomActive(
								roomActive,
								currentUser.id
							)
						});
				}
			}
		})
		.then(roomActive => {
			dispatch({
				type: types.ENTER_ROOM,
				roomActive: onSetRoomActive(roomActive, currentUser.id)
			});
			dispatch(getRooms(currentUser));
		})
		.catch(err => {
			dispatch({ type: types.NOT_FOUND });
			alertError('Error on entering rooms: ', err);
		});
};

export const createRoom = (name, message) => (dispatch, getState) => {
	const currentUser = getState().currentUser;
	currentUser
		.createRoom({ name, customData: { lastMessage: '' } })
		.then(room => {
			const roomId = room.id;
			const parts = [];
			if (message.trim()) {
				parts.push({ type: 'text/plain', content: message });
				dispatch(sendMessage(parts, `${roomId}`));
			}
			history.pushState(null, null, `#/room/${roomId}`);
			setTimeout(() => dispatch(enterRoom(roomId)), 250);
		})
		.catch(err => alertError('Error on creating rooms', err));
};

export const createPrivateRoom = user => (dispatch, getState) => {
	const { chatkit, currentUser } = getState();
	const { id, name, avatarURL } = currentUser;

	const roomId = HmacSHA1(`${id}${user.id}`, key).toString();
	const otherRoomId = HmacSHA1(`${user.id}${id}`, key).toString();
	const members =
		user.id === id
			? [{ id, name, avatarURL }]
			: [
					{ id, name, avatarURL },
					{ id: user.id, name: user.name, avatarURL: user.avatarURL }
			  ];

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
