/* jshint esversion: 10 */
/* eslint-disable */

import { TOGGLE_CALL, SIGN_OUT } from '../../constants';

const initialState = { show: false, cam: false };
const videoCall = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CALL:
			const show = !state.show;
			const cam = action.cam;
			return { ...state, show, cam };
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default videoCall;

/* eslint-enable */
