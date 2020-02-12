/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = [];
const messages = (state = initialState, action) => {
	switch (action.type) {
		case types.ON_MESSAGE:
			return [...state, action.message];
		case types.CLEAR_MESSAGE:
			return [];
		default:
			return state;
	}
};

export default messages;

/* eslint-enable */
