/* jshint esversion: 10 */
/* eslint-disable */

import { TOGGLE_USERS_BAR } from '../../constants';

const initialState = false;
const showUsersBar = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_USERS_BAR:
			return !state;
		default:
			return state;
	}
};

export default showUsersBar;

/* eslint-enable */
