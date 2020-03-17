/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { TOGGLE_USERS_BAR, SIGN_OUT } from '../../constants';

const initialState = false;
const showUsersBar = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_USERS_BAR:
			return !state;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default showUsersBar;

/* eslint-enable */
