/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import Avatar from '../Avatar';

export default function Wrapper({ userType, userName, updatedAt, children }) {
	return (
		<div className={`message ${userType}`}>
			{userType !== 'me' && <Avatar name={userName} type='user' />}
			<div className='text-main'>
				<div className={`text-group ${userType}`}>{children}</div>
				{updatedAt && (
					<span>
						{new Date(updatedAt).toLocaleTimeString('en-US', {
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
