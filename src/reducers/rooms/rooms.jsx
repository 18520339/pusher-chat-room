/* jshint esversion: 10 */
/* eslint-disable */

import { GET_ROOMS, UPDATE_ROOM } from '../../constants';

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
		default:
			return state;
	}
};

export default rooms;

/* eslint-enable */
