/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = [];
const currentRooms = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ROOMS:
			return action.currentRooms;
		default:
			return state;
	}
};

export default currentRooms;

/* eslint-enable */
