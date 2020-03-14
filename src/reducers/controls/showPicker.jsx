/* jshint esversion: 10 */
/* eslint-disable */

import { ADD_EMOJI, TOGGLE_PICKER, SIGN_OUT } from '../../constants';

const initialState = false;
const showPicker = (state = initialState, action) => {
	switch (action.type) {
		case ADD_EMOJI:
			return false;
		case TOGGLE_PICKER:
			return !state;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default showPicker;

/* eslint-enable */
