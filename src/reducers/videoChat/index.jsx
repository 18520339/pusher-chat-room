/* jshint esversion: 10 */
/* eslint-disable */

import { TOGGLE_CALL } from '../../constants';

const initialState = { show: false, cam: false };
const videoChat = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CALL:
			const show = !state.show;
			const cam = action.cam;
			return { ...state, show, cam };
		default:
			return state;
	}
};

export default videoChat;

/* eslint-enable */
