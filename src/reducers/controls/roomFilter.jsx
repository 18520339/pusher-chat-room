/* jshint esversion: 10 */
/* eslint-disable */

import { FILTER_ROOMS } from '../../constants';

const initialState = { name: '', status: 0, isPrivate: false };
const roomFilter = (state = initialState, action) => {
	switch (action.type) {
		case FILTER_ROOMS:
			const { name, status, isPrivate } = action;
			return { ...state, name, status, isPrivate };
		default:
			return state;
	}
};

export default roomFilter;

/* eslint-enable */
