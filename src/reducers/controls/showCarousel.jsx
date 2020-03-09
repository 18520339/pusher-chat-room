/* jshint esversion: 10 */
/* eslint-disable */

import { TOGGLE_CAROUSEL } from '../../constants';

const initialState = { isShow: false, imageIndex: -1, where: '' };
const showCarousel = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_CAROUSEL:
			return {
				...showCarousel,
				isShow: !state.isShow,
				imageIndex: action.imageIndex,
				where: action.where
			};
		default:
			return state;
	}
};

export default showCarousel;

/* eslint-enable */
