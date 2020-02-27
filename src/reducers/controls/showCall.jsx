/* jshint esversion: 10 */
/* eslint-disable */

import { TOGGLE_CALL } from '../../constants';

const initialState = false;
const showCall = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CALL:
			return !state;
		default:
			return state;
	}
};

export default showCall;

/* eslint-enable */
