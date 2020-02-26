/* jshint esversion: 10 */
/* eslint-disable */

import { CONNECT, SIGN_OUT } from '../../constants';

const initialState = {};
const currentUser = (state = initialState, action) => {
	switch (action.type) {
		case CONNECT:
			return action.currentUser;
		case SIGN_OUT:
			return {};
		default:
			return state;
	}
};

export default currentUser;

/* eslint-enable */
