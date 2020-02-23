/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import Avatar from '../Avatar';

export default function Message(props) {
	const { userType, userName, createdAt, children } = props;
	return (
		<div className={`message ${userType}`}>
			{userType !== 'me' && (
				<Avatar name={userName} type='user' tooltip='top' />
			)}
			<div className='text-main'>
				<div className={`text-group ${userType}`}>
					<div className={`text ${userType}`}>{children}</div>
				</div>
				{createdAt && (
					<span>
						{new Date(createdAt).toLocaleTimeString('en-US', {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
				)}
			</div>
		</div>
	);
}

/* eslint-enable */
