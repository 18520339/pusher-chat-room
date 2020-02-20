/* jshint esversion: 10 */
/* eslint-disable */

import { key } from '../config';
import { SIGN_IN, SIGN_OUT } from '../constants';

import { HmacSHA1 } from 'crypto-js';
import { alertError } from '../functions';

export const signUpAPI = (name, email, password) => (dispatch, getState) => {
	const chatkit = getState().chatkit;
	const id = HmacSHA1(email + '@!?#?' + password, key).toString();
	const avatarURL = `https://avatars.dicebear.com/v2/avataaars/${name}.svg?options[eyes][]=squint&options[eyebrow][]=raised&options[mouth][]=smile`;

	chatkit
		.createUser({ id, name, avatarURL })
		.then(() => alert('User created successfully'))
		.catch(err => alertError('Error on sign up', err));
};

export const signInAPI = (email, password, history, from) => {
	return (dispatch, getState) => {
		const chatkit = getState().chatkit;
		const id = HmacSHA1(email + '@!?#?' + password, key).toString();

		chatkit
			.getUser({ id })
			.then(() => dispatch({ type: SIGN_IN, userId: id, history, from }))
			.catch(err => alertError('Error on sign in', err));
	};
};

export const signOut = history => {
	return { type: SIGN_OUT, history };
};

/* eslint-enable */
