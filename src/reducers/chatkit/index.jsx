/* jshint esversion: 10 */
/* eslint-disable */

import Chatkit from '@pusher/chatkit-server';
import { instanceLocator, key } from '../../config';

const initialState = new Chatkit({ instanceLocator, key });
const chatkit = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default chatkit;

/* eslint-enable */
