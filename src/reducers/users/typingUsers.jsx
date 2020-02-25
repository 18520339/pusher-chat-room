/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = [];
const typingUsers = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_STARTED_TYPING:
			return [...state, action.user];
		case types.USER_STOPED_TYPING:
			return state.filter(user => user.id !== action.user.id);
		case types.SIGN_OUT:
			return [];
		default:
			return state;
	}
};

export default typingUsers;

/* eslint-enable */
