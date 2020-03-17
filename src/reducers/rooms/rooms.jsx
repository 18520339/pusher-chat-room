/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import {
	GET_ROOMS,
	UPDATE_ROOM,
	PRESENCE_CHANGED,
	SIGN_OUT
} from '../../constants';

const initialState = [];
const rooms = (state = initialState, action) => {
	switch (action.type) {
		case GET_ROOMS:
			return action.rooms;
		case UPDATE_ROOM:
			const index = state.findIndex(room => {
				if (room) return action.room.id === room.id;
			});
			if (index === -1) return state;
			state[index] = action.room;
			return [...state];
		case PRESENCE_CHANGED:
			return state;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default rooms;

/* eslint-enable */
