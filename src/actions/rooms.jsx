/* jshint esversion: 10 */
/* eslint-disable */

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from '../config';

import * as types from '../constants';
import { alertError } from '../functions';

import { toggleCall } from './controls';
import { sendMessage } from './messages';

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
	const { chatkit, currentUser, roomActive, showCall } = getState();
	dispatch({ type: types.CLEAR_MESSAGE });
	if (showCall) dispatch(toggleCall());

	try {
		currentUser.roomSubscriptions[roomActive.id].cancel();
	} catch {}

	currentUser
		.subscribeToRoomMultipart({
			roomId,
			messageLimit: 50,
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
			const { error } = err.info;
			if (error === 'services/chatkit/not_found/room_not_found') {
				chatkit
					.getUser({ id: roomId.replace('user=', '') })
					.then(user => {
						const { id, name } = user;
						dispatch(createRoom(name, '', id, true));
					})
					.catch(() => {
						alertError('Error on entering rooms: ', err);
						dispatch({ type: types.NOT_FOUND });
					});
			} else alertError('Error on entering rooms: ', err);
		});
};

export const createRoom = (name, message, userId = null, isPrivate = false) => {
	return (dispatch, getState) => {
		const { currentUser } = getState();
		const accessNewRoom = id => {
			dispatch(enterRoom(id));
			window.history.pushState(null, null, `room/${id}`);

			const parts = [];
			if (message.trim()) {
				parts.push({ type: 'text/plain', content: message });
				dispatch(sendMessage(parts, `${id}`));
			}
		};

		if (isPrivate)
			currentUser
				.createRoom({
					id: 'user=' + userId,
					name,
					private: true,
					addUserIds: [currentUser.id, userId]
				})
				.then(room => accessNewRoom(room.id))
				.catch(err => {
					const { error } = err.info;
					if (
						error ===
						'services/chatkit/bad_request/duplicate_room_id'
					)
						dispatch(enterRoom('user=' + userId));
					else lertError('Error on chatting 1 to 1', err);
				});
		else
			currentUser
				.createRoom({ name })
				.then(room => accessNewRoom(room.id))
				.catch(err => alertError('Error on creating rooms', err));
	};
};

/* eslint-enable */
