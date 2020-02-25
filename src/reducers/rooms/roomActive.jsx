/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = {};
const roomActive = (state = initialState, action) => {
	switch (action.type) {
		case types.ENTER_ROOM:
			return action.roomActive;
		case types.SIGN_OUT:
			return {};
		default:
			return state;
	}
};

export default roomActive;

/* eslint-enable */
