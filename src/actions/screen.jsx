/* jshint esversion: 10 */
/* eslint-disable */

import Chatkit from '@pusher/chatkit-server';
import { instanceLocator, key } from '../config';
import { HmacSHA1 } from 'crypto-js';

import { SIGN_IN } from '../constants';
import { alertError } from '../functions';

/* Run server using API */
export const signUpAPI = (name, email, password) => (dispatch, getState) => {
	const chatkit = new Chatkit({ instanceLocator, key });
	const id = HmacSHA1(email + '@!?#?' + password, key).toString();
	const avatarURL = `https://ui-avatars.com/api/?name=${name}&size=200`;

	chatkit
		.createUser({ id, name, avatarURL })
		.then(() => alert('User created successfully'))
		.catch(err => alertError('Error on sign up', err));
};

export const signInAPI = (email, password) => (dispatch, getState) => {
	const chatkit = new Chatkit({ instanceLocator, key });
	const id = HmacSHA1(email + '@!?#?' + password, key).toString();

	chatkit
		.getUser({ id })
		.then(() => dispatch({ type: SIGN_IN, id }))
		.catch(err => alertError('Error on sign in', err));
};

/* eslint-enable */
