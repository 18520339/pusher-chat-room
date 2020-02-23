/* jshint esversion: 10 */
/* eslint-disable */

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from '../config';

import { alertError } from '../functions';
import * as types from '../constants';

export const connect = userId => (dispatch, getState) => {
	const chatManager = new ChatManager({
		instanceLocator,
		userId,
		tokenProvider: new TokenProvider({ url: tokenUrl })
	});
	chatManager
		.connect({
			onRoomUpdated: room => {
				const { rooms } = getState();
				const index = rooms.findIndex(r => r.id === room.id);
				rooms[index] = room;
				dispatch({ type: types.UPDATE_ROOMS, rooms });
			}
		})
		.then(currentUser => {
			dispatch({ type: types.CONNECT, currentUser });
			dispatch(getRooms(currentUser));
		})
		.catch(err => alertError('Error on connection', err));
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
	dispatch({ type: types.CLEAR_MESSAGE });
	const { currentUser, roomActive } = getState();
	if (roomActive.id) currentUser.roomSubscriptions[roomActive.id].cancel();

	currentUser
		.subscribeToRoom({
			roomId,
			messageLimit: 100,
			hooks: {
				onMessage: message => {
					dispatch({ type: types.ON_MESSAGE, message });
					if (roomActive.id)
						return currentUser.setReadCursor({
							roomId: roomActive.id,
							position: message.id
						});
				},
				onUserStartedTyping: user => {
					dispatch({ type: types.USER_STARTED_TYPING, user });
				},
				onUserStoppedTyping: user => {
					dispatch({ type: types.USER_STOPED_TYPING, user });
				},
				onPresenceChanged: () => {
					const { roomActive } = getState();
					if (roomActive.id)
						dispatch({ type: types.PRESENCE_CHANGED, roomActive });
				}
			}
		})
		.then(roomActive => {
			dispatch({ type: types.ENTER_ROOM, roomActive });
			dispatch(getRooms(currentUser));
		})
		.catch(err => {
			alertError('Error on entering rooms: ', err);
			if (err.info.error === 'services/chatkit/not_found/room_not_found')
				dispatch({ type: types.NOT_FOUND });
		});
};

export const createRoom = (name, privateUserId = null, isPrivate = false) => {
	return (dispatch, getState) => {
		const { currentUser } = getState();
		const addUserIds = isPrivate ? [currentUser.id, privateUserId] : [];

		currentUser
			.createRoom({ name, private: isPrivate, addUserIds })
			.then(room => {
				dispatch(enterRoom(room.id));
				window.history.pushState(null, null, room.id);
			})
			.catch(err => alertError('Error on creating rooms', err));
	};
};

/* eslint-enable */
