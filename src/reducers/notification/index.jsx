/* jshint esversion: 10 */
/* eslint-disable */

import { SHOW_NOTIFICATION_TOAST } from '../../constants';

const initialState = false;
const notification = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_NOTIFICATION_TOAST:
			return action.isShow;
		default:
			return state;
	}
};

export default notification;

/* eslint-enable */
