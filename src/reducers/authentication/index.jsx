/* jshint esversion: 10 */
/* eslint-disable */

import { SIGN_IN, SIGN_OUT } from '../../constants';

const initialState = { userId: '', currentScreen: 'SignIn' };
const authentication = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { userId: action.userId, currentScreen: 'Chat' };
		case SIGN_OUT:
			return { userId: '', currentScreen: 'SignIn' };
		default:
			return state;
	}
};

export default authentication;

/* eslint-enable */
