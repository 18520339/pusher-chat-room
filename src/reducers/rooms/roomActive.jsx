/* jshint esversion: 10 */
/* eslint-disable */

import { ENTER_ROOM } from '../../constants';

const initialState = {};
const roomActive = (state = initialState, action) => {
	switch (action.type) {
		case ENTER_ROOM:
			return action.roomActive;
		default:
			return state;
	}
};

export default roomActive;

/* eslint-enable */
