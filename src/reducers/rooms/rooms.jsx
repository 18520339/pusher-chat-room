/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = [];
const rooms = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ROOMS:
			return action.rooms;
		case types.UPDATE_ROOMS:
			return action.rooms;
		default:
			return state;
	}
};

export default rooms;

/* eslint-enable */
