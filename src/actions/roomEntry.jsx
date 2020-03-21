/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import * as types from '../constants';
import { alertError, getPrivateRoom } from '../utils';
import { showNotificationToast, showNotification } from './notification';

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
						dispatch(showNotification(message));
					}, 250);

					if (location.pathname.substr(6) === roomId) {
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

/* eslint-enable */
