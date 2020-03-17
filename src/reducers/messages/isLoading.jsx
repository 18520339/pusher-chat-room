/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { GET_ROOMS, CLEAR_MESSAGE, NOT_FOUND, SIGN_OUT } from '../../constants';

const initialState = true;
const isLoading = (state = initialState, action) => {
	switch (action.type) {
		case GET_ROOMS:
			return false;
		case CLEAR_MESSAGE:
			return true;
		case NOT_FOUND:
			return false;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default isLoading;

/* eslint-enable */
