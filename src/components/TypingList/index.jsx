/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function TypingList() {
	const { usersTyping } = useSelector(state => state);
	const countUsersTyping = usersTyping ? usersTyping.length : 0;

	if (countUsersTyping > 0) {
		return (
			<b className='typing-users'>{usersTyping.join(', ')} đang gõ...</b>
		);
	}
	return <div></div>;
}

/* eslint-enable */
