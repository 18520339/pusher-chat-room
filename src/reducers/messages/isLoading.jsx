/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = true;
const isLoading = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ROOMS:
			return false;
		case types.CLEAR_MESSAGE:
			return true;
		case types.NOT_FOUND:
			return false;
		default:
			return state;
	}
};

export default isLoading;

/* eslint-enable */
