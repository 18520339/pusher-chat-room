/* jshint esversion: 10 */
/* eslint-disable */

import { ENTER_ROOM, SIGN_OUT } from '../../constants';

const initialState = {};
const roomActive = (state = initialState, action) => {
	switch (action.type) {
		case ENTER_ROOM:
			return action.roomActive;
		case SIGN_OUT:
			return {};
		default:
			return state;
	}
};

export default roomActive;

/* eslint-enable */
