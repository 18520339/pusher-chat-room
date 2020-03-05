/* jshint esversion: 10 */
/* eslint-disable */

import { TOGGLE_CALL, TOGGLE_CALL_OPTION } from '../../constants';

const initialState = {
	pause: false,
	cam: false,
	show: false,
	screenShare: false,
	mute: false
};
const videoChat = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CALL:
			const show = !state.show;
			const cam = action.cam;
			return { ...state, show, cam };
		case TOGGLE_CALL_OPTION:
			const option = action.option;
			const optValue = state[option];
			return { ...state, [option]: !optValue };
		default:
			return state;
	}
};

export default videoChat;

/* eslint-enable */
