/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../constants';

export const filterRooms = (name, status = null) => {
	return { type: types.FILTER_ROOMS, name, status };
};

export const sortMembers = (by, value) => {
	return { type: types.SORT_MEMBERS, by, value };
};
export const toggleUsersBar = () => {
	return { type: types.TOGGLE_USERS_BAR };
};

export const toggleCall = () => {
	return { type: types.TOGGLE_CALL };
};

export const togglePicker = () => {
	return { type: types.TOGGLE_PICKER };
};

export const addEmoji = (emoji, message) => (dispatch, getState) => {
	dispatch({ type: types.ADD_EMOJI });
	return `${message}${emoji.native}`;
};

/* eslint-enable */
