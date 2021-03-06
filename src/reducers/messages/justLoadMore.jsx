/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import {
	ON_MESSAGE,
	CLEAR_MESSAGE,
	START_LOAD_MORE,
	END_LOAD_MORE,
	SIGN_OUT
} from '../../constants';

const initialState = false;
const justLoadMore = (state = initialState, action) => {
	switch (action.type) {
		case ON_MESSAGE:
			return false;
		case CLEAR_MESSAGE:
			return false;
		case START_LOAD_MORE:
			return false;
		case END_LOAD_MORE:
			return true;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default justLoadMore;

/* eslint-enable */
