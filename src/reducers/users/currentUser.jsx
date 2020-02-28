/* jshint esversion: 10 */
/* eslint-disable */

import { CONNECT } from '../../constants';

const initialState = {};
const currentUser = (state = initialState, action) => {
	switch (action.type) {
		case CONNECT:
			return action.currentUser;
		default:
			return state;
	}
};

export default currentUser;

/* eslint-enable */
