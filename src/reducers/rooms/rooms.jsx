/* jshint esversion: 10 */
/* eslint-disable */

import { GET_ROOMS, UPDATE_ROOMS, SIGN_OUT } from '../../constants';

const initialState = [];
const rooms = (state = initialState, action) => {
	switch (action.type) {
		case GET_ROOMS:
			return action.rooms;
		case UPDATE_ROOMS:
			return action.rooms;
		case SIGN_OUT:
			return [];
		default:
			return state;
	}
};

export default rooms;

/* eslint-enable */
