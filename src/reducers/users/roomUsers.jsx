/* jshint esversion: 10 */
/* eslint-disable */

import * as types from '../../constants';

const initialState = [];
const roomUsers = (state = initialState, action) => {
	switch (action.type) {
		case types.ENTER_ROOM:
			return action.roomActive.users;
		case types.PRESENCE_CHANGED:
			return action.roomActive.users.sort(a => {
				if (a.presence.state === 'online') return -1;
				else return 1;
			});
		case types.SIGN_OUT:
			return [];
		default:
			return state;
	}
};

export default roomUsers;

/* eslint-enable */
