/* jshint esversion: 10 */
/* eslint-disable */

import Chatkit from '@pusher/chatkit-server';
import { instanceLocator, key } from '../../config';
import { SIGN_IN } from '../../constants';

/* Run server on localhost */
export const loginByLocal = userName => (dispatch, getState) => {
	fetch('http://localhost:3001/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userName })
	})
		.then(res => dispatch({ type: SIGN_IN, userName }))
		.catch(err => console.log(err));
};

/* Run server using API */
export const loginByAPI = userName => (dispatch, getState) => {
	const chatkit = new Chatkit({ instanceLocator, key });
	chatkit
		.createUser({ id: userName, name: userName })
		.then(() => console.log('User created successfully'))
		.catch(err => console.log(err));
	dispatch({ type: SIGN_IN, userName });
};

/* eslint-enable */
