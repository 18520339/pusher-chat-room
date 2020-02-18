/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = { id: '', currentScreen: 'SignIn' };
const screen = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGN_IN:
			return { id: action.id, currentScreen: 'Chat' };
		default:
			return state;
	}
};

export default screen;

/* eslint-enable */
