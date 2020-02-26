/* jshint esversion: 10 */
/* eslint-disable */

import { SORT_MEMBERS } from '../../constants';

const initialState = { by: 'status', value: 1 };
const userSort = (state = initialState, action) => {
	switch (action.type) {
		case SORT_MEMBERS:
			const { by, value } = action;
			return { by, value };
		default:
			return state;
	}
};

export default userSort;

/* eslint-enable */
