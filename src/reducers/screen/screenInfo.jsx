/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = { userName: '', currentScreen: 'LoginScreen' };
const screenInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGN_IN:
			return { userName: action.userName, currentScreen: 'ChatScreen' };
		default:
			return state;
	}
};

export default screenInfo;

/* eslint-enable */
