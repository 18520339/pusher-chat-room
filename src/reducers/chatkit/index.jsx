/* jshint esversion: 10 */
/* eslint-disable */

import Chatkit from '@pusher/chatkit-server';
import { instanceLocator, key } from '../../config';
import { SIGN_OUT } from '../../constants';

const initialState = new Chatkit({ instanceLocator, key });
const chatkit = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default chatkit;

/* eslint-enable */
