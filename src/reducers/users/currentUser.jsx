/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { CONNECT, SIGN_OUT } from '../../constants';

const initialState = {};
const currentUser = (state = initialState, action) => {
	switch (action.type) {
		case CONNECT:
			return action.currentUser;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default currentUser;

/* eslint-enable */
