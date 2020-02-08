/* jshint esversion: 10 */
/* eslint-disable */

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from '../../config';
import { alertError } from '../../utils';
import * as types from '../../constants';

export const connect = userName => (dispatch, getState) => {
	const chatManager = new ChatManager({
		instanceLocator,
		userId: userName,
		tokenProvider: new TokenProvider({ url: tokenUrl })
	});
	chatManager
		.connect()
		.then(currentUser => {
			dispatch({ type: types.CONNECT, currentUser });
			dispatch(getRooms(currentUser));
		})
		.catch(err => alertError('Error on connection: ', err));
};

export const getRooms = currentUser => (dispatch, getState) => {
	currentUser
		.getJoinableRooms()
		.then(unjoinedRooms => {
			const currentRooms = [...currentUser.rooms, ...unjoinedRooms];
			dispatch({ type: types.GET_ROOMS, currentRooms });
		})
		.catch(err => alertError('Error on getting rooms: ', err));
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
				},
				onUserStartedTyping: user => {
					dispatch({ type: types.USER_STARTED_TYPING, user });
				},
				onUserStoppedTyping: user => {
					dispatch({ type: types.USER_STOPED_TYPING, user });
				},
				onUserJoinedRoom: () => this.forceUpdate(),
				onUserLeftRoom: () => this.forceUpdate(),
				onPresenceChange: () => this.forceUpdate()
			}
		})
		.then(room => {
			dispatch({ type: types.ENTER_ROOM, room });
			dispatch(getRooms(currentUser));
		})
		.catch(err => alertError('Error on entering rooms: ', err));
};

export const createRoom = name => (dispatch, getState) => {
	const { currentUser } = getState();
	currentUser
		.createRoom({ name })
		.then(room => {
			dispatch(enterRoom(room.id));
			window.history.pushState(null, null, room.id);
		})
		.catch(err => alertError('Error on creating rooms: ', err));
};

/* eslint-enable */
