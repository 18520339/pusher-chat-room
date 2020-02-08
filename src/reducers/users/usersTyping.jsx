/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = [];
const usersTyping = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_STARTED_TYPING:
			return [...state, action.user.name];
		case types.USER_STOPED_TYPING:
			return state.filter(userName => userName !== action.user.name);
		default:
			return state;
	}
};

export default usersTyping;

/* eslint-enable */
