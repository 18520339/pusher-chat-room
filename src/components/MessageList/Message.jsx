/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import Avatar from '../Avatar';

export default function Message(props) {
	const { userType, userName, updatedAt, children } = props;
	return (
		<div className={`message ${userType}`}>
			{userType !== 'me' && (
				<Avatar name={userName} type='user' tooltip='top' />
			)}
			<div className='text-main'>
				<div className={`text-group ${userType}`}>
					{children.map((child, index) => {
						if (child.type === 'a') return child;
						return (
							<div key={index} className={`text ${userType}`}>
								{child}
							</div>
						);
					})}
				</div>
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
