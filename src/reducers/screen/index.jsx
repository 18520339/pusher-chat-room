/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = { userId: '', currentScreen: 'SignIn' };
const screen = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGN_IN:
			return { userId: action.userId, currentScreen: 'Chat' };
		case types.SIGN_OUT:
			return { userId: '', currentScreen: 'SignIn' };
		default:
			return state;
	}
};

export default screen;

/* eslint-enable */
