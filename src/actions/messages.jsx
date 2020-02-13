/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../constants';
import { alertError } from '../functions';

export const typingMessage = () => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.isTypingIn({ roomId: roomActive.id })
		.catch(err => alertError('Error on typing rooms', err));
};

export const sendMessage = text => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.sendSimpleMessage({ roomId: roomActive.id, text })
		.catch(err => alertError('Error on sending message', err));
};

export const addEmoji = (emoji, message) => (dispatch, getState) => {
	dispatch({ type: types.ADD_EMOJI });
	return `${message}${emoji.native}`;
};

export const togglePicker = () => {
	return { type: types.TOGGLE_PICKER };
};

/* eslint-enable */
