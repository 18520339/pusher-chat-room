/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = { userName: '', currentScreen: 'LoginScreen' };
const screen = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGN_IN:
			return { userName: action.userName, currentScreen: 'ChatScreen' };
		default:
			return state;
	}
};

export default screen;

/* eslint-enable */
