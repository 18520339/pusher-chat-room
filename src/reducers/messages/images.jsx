/* jshint esversion: 10 */
/* eslint-disable */

import { ON_MESSAGE, CLEAR_MESSAGE } from '../../constants';

const initialState = [];
const images = (state = initialState, action) => {
	switch (action.type) {
		case ON_MESSAGE:
			action.message.parts.forEach(({ partType, payload }) => {
				if (partType === 'attachment') state.push(payload._downloadURL);
			});
			return state;
		case CLEAR_MESSAGE:
			return [];
		default:
			return state;
	}
};

export default images;

/* eslint-enable */
