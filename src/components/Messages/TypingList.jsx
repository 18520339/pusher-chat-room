/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function TypingList() {
	const { usersTyping } = useSelector(state => state);

	return (
		<b className='typing-users'>
			{usersTyping.length > 0 && (
				<span>{usersTyping.join(', ')} đang gõ...</span>
			)}
		</b>
	);
}

/* eslint-enable */
