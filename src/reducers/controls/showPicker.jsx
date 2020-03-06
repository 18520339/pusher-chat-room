/* jshint esversion: 10 */
/* eslint-disable */

import { ADD_EMOJI, TOGGLE_PICKER } from '../../constants';

const initialState = false;
const showPicker = (state = initialState, action) => {
	switch (action.type) {
		case ADD_EMOJI:
			return false;
		case TOGGLE_PICKER:
			return !state;
		default:
			return state;
	}
};

export default showPicker;

/* eslint-enable */