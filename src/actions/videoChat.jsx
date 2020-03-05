/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../constants';

export const toggleCall = (cam = false) => {
	return { type: types.TOGGLE_CALL, cam };
};

export const toggleCallOption = (option, value) => {
	return { type: types.TOGGLE_CALL_OPTION, option, value };
};

/* eslint-enable */
