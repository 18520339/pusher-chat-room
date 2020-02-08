/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function Message(props) {
	const { currentUser } = useSelector(state => state);
	const { sender, text } = props;

	const isRight = currentUser.id === sender.id ? 'text-right' : 'd-flex';
	var avatar = sender.name.replace(' ', '+');
	avatar = `https://ui-avatars.com/api/?name=${avatar}&rounded=true&size=40&font-size=0.4`;

	return (
		<li className={'message ' + isRight}>
			{isRight == 'd-flex' && (
				<div className='avatar mr-2'>
					<img src={avatar} />
				</div>
			)}
			<div className='message-info'>
				<div className='message-username'>
					<h6>{sender.name}</h6>
				</div>
				<span className='message-text'>{text}</span>
			</div>
		</li>
	);
}

/* eslint-enable */
