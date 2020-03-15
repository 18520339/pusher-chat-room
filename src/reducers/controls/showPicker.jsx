/* jshint esversion: 10 */
/* eslint-disable */

import {
	FILTER_ROOMS,
	TOGGLE_CALL,
	TOGGLE_PICKER,
	TOGGLE_CAROUSEL,
	TOGGLE_USERS_BAR,
	SEND_MESSAGE,
	CLEAR_MESSAGE,
	SIGN_OUT
} from '../../constants';

const initialState = false;
const showPicker = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_PICKER:
			return !state;
		case FILTER_ROOMS:
		case TOGGLE_CALL:
		case TOGGLE_CAROUSEL:
		case TOGGLE_USERS_BAR:
		case SEND_MESSAGE:
		case CLEAR_MESSAGE:
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default showPicker;

/* eslint-enable */
