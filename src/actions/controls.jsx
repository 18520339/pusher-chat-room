/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../constants';

export const addEmoji = (emoji, message) => (dispatch, getState) => {
	dispatch({ type: types.ADD_EMOJI });
	return `${message}${emoji.native}`;
};

export const sortMembers = (by, value) => {
	return { type: types.SORT_MEMBERS, by, value };
};

export const filterRooms = (name, status = null) => {
	return { type: types.FILTER_ROOMS, name, status };
};
export const toggleCall = (cam = false) => {
	return { type: types.TOGGLE_CALL, cam };
};

export const togglePicker = () => {
	return { type: types.TOGGLE_PICKER };
};

export const toggleCarousel = (imageIndex = -1, where = '') => {
	return { type: types.TOGGLE_CAROUSEL, imageIndex, where };
};

export const toggleUsersBar = () => {
	return { type: types.TOGGLE_USERS_BAR };
};

/* eslint-enable */
