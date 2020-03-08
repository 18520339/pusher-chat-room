/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../constants';
import { alertError } from '../functions';
import { sendMessage, fetchLastMessage } from './messages';

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
	const { chatkit, currentUser } = getState();
	dispatch({ type: types.CLEAR_MESSAGE });
	if (!currentUser.id) return;

	currentUser
		.subscribeToRoomMultipart({
			roomId,
			messageLimit: 50,
			hooks: {
				onMessage: message => {
					const { roomId, sender, parts } = message;
					const { partType, payload } = parts[parts.length - 1];

					const { id, name } = sender;
					const owner = currentUser.id === id ? 'Bạn' : name;
					var lastMessage = `${owner} đã gửi 1 ảnh`;

					if (partType === 'inline')
						lastMessage = `${owner}: ${payload.content}`;
					dispatch(fetchLastMessage(roomId, lastMessage));

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
					const { roomActive } = getState();
					if (roomActive.id === roomId)
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
		const accessNewRoom = room => {
			const roomId = room.id;
			const parts = [];
			if (message.trim()) {
				parts.push({ type: 'text/plain', content: message });
				dispatch(sendMessage(parts, `${roomId}`));
			}
			history.pushState(null, null, `#/room/${roomId}`);
			setTimeout(() => dispatch(enterRoom(roomId)), 100);
		};

		if (isPrivate)
			currentUser
				.createRoom({
					id: `user=${userId}`,
					name,
					private: true,
					addUserIds: [currentUser.id, userId],
					customData: { lastMessage: '' }
				})
				.then(room => accessNewRoom(room))
				.catch(err => {
					if (
						err.info ===
						'services/chatkit/bad_request/duplicate_room_id'
					)
						dispatch(enterRoom('user=' + userId));
					else alertError('Error on chatting 1 to 1', err);
				});
		else
			currentUser
				.createRoom({ name, customData: { lastMessage: '' } })
				.then(room => accessNewRoom(room))
				.catch(err => alertError('Error on creating rooms', err));
	};
};

/* eslint-enable */
