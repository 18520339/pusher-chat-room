/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function TypingList() {
	const { typingUsers } = useSelector(state => state);

	return (
		<b className='typing-users'>
			{typingUsers.length > 0 && (
				<span className='alert alert-info'>
					{typingUsers.join(', ')} đang gõ...
				</span>
			)}
		</b>
	);
}

/* eslint-enable */
