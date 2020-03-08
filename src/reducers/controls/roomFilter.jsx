/* jshint esversion: 10 */
/* eslint-disable */

import { FILTER_ROOMS } from '../../constants';

const initialState = { name: '', status: 0 };
const roomFilter = (state = initialState, action) => {
	switch (action.type) {
		case FILTER_ROOMS:
			var { name, status } = action;
			if (status === null) status = state.status;
			return { ...state, name, status };
		default:
			return state;
	}
};

export default roomFilter;

/* eslint-enable */
