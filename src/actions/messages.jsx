/* jshint esversion: 10 */
/* eslint-disable */

import { ADD_EMOJI, TOGGLE_PICKER } from '../constants';
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

export const addEmoji = (emoji, message) => (dispatch, getState) => {
	dispatch({ type: ADD_EMOJI });
	return `${message}${emoji.native}`;
};

export const togglePicker = () => {
	return { type: TOGGLE_PICKER };
};

/* eslint-enable */
