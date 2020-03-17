/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import { ENTER_ROOM, PRESENCE_CHANGED, SIGN_OUT } from '../../constants';

const initialState = [];
const roomUsers = (state = initialState, action) => {
	switch (action.type) {
		case ENTER_ROOM:
			return action.roomActive.users;
		case PRESENCE_CHANGED:
			return action.roomActive.users.sort(user => {
				if (user.presence.state === 'online') return -1;
				else return 1;
			});
		case SIGN_OUT:
			return initialState;
		default:
			return state;
	}
};

export default roomUsers;

/* eslint-enable */
