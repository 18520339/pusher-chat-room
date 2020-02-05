/* jshint esversion: 9 */
/* eslint-disable */

import React from 'react';

export default function TypingList(props) {
	const countUsersTyping = props.usersTyping ? props.usersTyping.length : 0;

	if (countUsersTyping > 0) {
		return (
			<b className='typing-users'>
				{props.usersTyping.join(', ')} đang gõ...
			</b>
		);
	}
	return <div></div>;
}

/* eslint-enable */
