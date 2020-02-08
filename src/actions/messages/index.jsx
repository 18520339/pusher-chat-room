/* jshint esversion: 10 */
/* eslint-disable */

import { alertError } from '../../utils';

export const typingMessage = () => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.isTypingIn({ roomId: roomActive.id })
		.catch(err => alertError('Error on typing rooms: ', err));
};

export const sendMessage = text => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.sendSimpleMessage({ roomId: roomActive.id, text })
		.catch(err => alertError('Error on sending message: ', err));
};

/* eslint-enable */
