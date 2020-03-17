/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import {
	CONNECT,
	ENTER_ROOM,
	PRESENCE_CHANGED,
	SIGN_OUT
} from '../../constants';

const initialState = {};
const roomActive = (state = initialState, action) => {
	switch (action.type) {
		case CONNECT:
			return state;
		case ENTER_ROOM:
			return action.roomActive;
		case PRESENCE_CHANGED:
			return action.roomActive;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default roomActive;

/* eslint-enable */
