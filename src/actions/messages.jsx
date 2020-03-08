/* jshint esversion: 10 */
/* eslint-disable */

import { alertError } from '../functions';

export const typingMessage = () => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.isTypingIn({ roomId: roomActive.id })
		.catch(err => alertError('Error on typing rooms', err));
};

export const sendMessage = (parts, roomId = null) => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	if (roomId === null) roomId = `${roomActive.id}`;
	currentUser
		.sendMultipartMessage({ roomId, parts })
		.catch(err => alertError('Error on sending message', err));
};

export const fetchLastMessage = (roomId, lastMessage = '') => {
	return (dispatch, getState) => {
		const { currentUser } = getState();
		currentUser.updateRoom({ roomId, customData: { lastMessage } });
	};
};
