/* jshint esversion: 10 */
/* eslint-disable */

import { GET_ROOMS, CLEAR_MESSAGE, NOT_FOUND } from '../../constants';

const initialState = true;
const isLoading = (state = initialState, action) => {
	switch (action.type) {
		case GET_ROOMS:
			return false;
		case CLEAR_MESSAGE:
			return true;
		case NOT_FOUND:
			return false;
		default:
			return state;
	}
};

export default isLoading;

/* eslint-enable */
