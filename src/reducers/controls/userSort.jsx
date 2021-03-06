/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { CLEAR_MESSAGE, SORT_MEMBERS, SIGN_OUT } from '../../constants';

const initialState = { by: 'status', value: 1 };
const userSort = (state = initialState, action) => {
	switch (action.type) {
		case SORT_MEMBERS:
			const { by, value } = action;
			return { ...state, by, value };
		case CLEAR_MESSAGE:
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default userSort;

/* eslint-enable */
