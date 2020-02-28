/* jshint esversion: 10 */
/* eslint-disable */

import { USER_STARTED_TYPING, USER_STOPED_TYPING } from '../../constants';

const initialState = [];
const typingUsers = (state = initialState, action) => {
	switch (action.type) {
		case USER_STARTED_TYPING:
			return [...state, action.user];
		case USER_STOPED_TYPING:
			return state.filter(user => user.id !== action.user.id);
		default:
			return state;
	}
};

export default typingUsers;

/* eslint-enable */
