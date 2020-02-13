/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function Message(props) {
	const { currentUser, roomUsers } = useSelector(state => state);
	const { id, name } = currentUser;
	const { sender, text } = props;

	const isRight = sender.id === id ? 'text-right' : 'd-flex';
	let avatar = sender.name.replace(' ', '+');
	avatar = `https://ui-avatars.com/api/?name=${avatar}&rounded=true&size=40&font-size=0.4`;

	const insertTextAtIndices = (text, obj) => {
		return text.replace(/./g, (character, index) => {
			return obj[index] ? obj[index] + character : character;
		});
	};

	const mentions = text.match(/@[a-zA-Z0-9]+/g) || [];
	const roomUserNames = roomUsers.map(user => `@${user.name}`);
	const mentionedUsers = mentions.filter(username =>
		roomUserNames.includes(username)
	);

	let messageText = text;
	mentionedUsers.forEach(user => {
		const startIndex = messageText.indexOf(user);
		const endIndex = startIndex + user.length;
		const isCurrent = name === user.substring(1) ? ' is-current' : '';

		messageText = insertTextAtIndices(messageText, {
			[startIndex]: `<span class="mentioned-user${isCurrent}">`,
			[endIndex]: '</span>'
		});
	});

	return (
		<li className={'message ' + isRight}>
			{isRight === 'd-flex' && (
				<div className='avatar mr-2'>
					<img src={avatar} />
				</div>
			)}
			<div className='message-info'>
				<div className='message-username'>
					<h6>{sender.name}</h6>
				</div>
				<span
					className='message-text'
					dangerouslySetInnerHTML={{ __html: messageText }}
				/>
			</div>
		</li>
	);
}

/* eslint-enable */
