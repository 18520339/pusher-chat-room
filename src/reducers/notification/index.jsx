/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { SHOW_NOTIFICATION_TOAST, SIGN_OUT } from '../../constants';

const initialState = false;
const notification = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_NOTIFICATION_TOAST:
			return action.isShow;
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default notification;

/* eslint-enable */
