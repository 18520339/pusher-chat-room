/* jshint esversion: 10 */
/* eslint-disable */

import {
	ON_MESSAGE,
	END_LOAD_MORE,
	CLEAR_MESSAGE,
	SIGN_OUT
} from '../../constants';

const initialState = [];
const messages = (state = initialState, action) => {
	switch (action.type) {
		case ON_MESSAGE:
			return [...state, action.message];
		case END_LOAD_MORE:
			return [...action.messages, ...state];
		case CLEAR_MESSAGE:
			return [];
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default messages;

/* eslint-enable */
