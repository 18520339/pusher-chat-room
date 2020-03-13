/* jshint esversion: 10 */
/* eslint-disable */

import { CONNECT, ENTER_ROOM, PRESENCE_CHANGED } from '../../constants';

const initialState = {};
const roomActive = (state = initialState, action) => {
	switch (action.type) {
		case CONNECT:
			return state;
		case ENTER_ROOM:
			return action.roomActive;
		case PRESENCE_CHANGED:
			return action.roomActive;
		default:
			return state;
	}
};

export default roomActive;

/* eslint-enable */
