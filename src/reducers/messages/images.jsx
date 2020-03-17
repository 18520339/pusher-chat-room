/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import {
	ON_MESSAGE,
	CLEAR_MESSAGE,
	END_LOAD_MORE,
	SIGN_OUT
} from '../../constants';

const initialState = [];
const images = (state = initialState, action) => {
	switch (action.type) {
		case END_LOAD_MORE:
			action.messages.forEach(message => {
				message.parts.forEach(({ partType, payload }) => {
					if (partType === 'attachment')
						state.push({ src: payload._downloadURL });
				});
			});
			return state;
		case ON_MESSAGE:
			action.message.parts.forEach(({ partType, payload }) => {
				if (partType === 'attachment')
					state.push({ src: payload._downloadURL });
			});
			return state;
		case CLEAR_MESSAGE:
			return [];
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default images;

/* eslint-enable */
