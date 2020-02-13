/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = false;
const showPicker = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_EMOJI:
			return false;
		case types.TOGGLE_PICKER:
			return !state;
		default:
			return state;
	}
};

export default showPicker;

/* eslint-enable */
