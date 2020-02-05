/* jshint esversion: 9 */
/* eslint-disable */

import React from 'react';

export default function Message(props) {
	const { currentUser, sender, text } = props;
	const isRight = currentUser.id === sender.id ? 'text-right' : '';

	return (
		<li className={'message ' + isRight}>
			<div className='message-username'>
				<h6>{sender.name}</h6>
			</div>
			<span className='message-text'>{text}</span>
		</li>
	);
}

/* eslint-enable */
