/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';

export default function Message(props) {
	const { currentUser, roomUsers } = useSelector(state => state);
	const { id, name } = currentUser;
	const { sender, createdAt, text } = props;

	const isMe = sender.id === id ? ' me' : '';
	const textDate = new Date(createdAt).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	});

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
		const isMe = name === user.substring(1) ? 'danger' : 'info';

		messageText = insertTextAtIndices(messageText, {
			[startIndex]: `<p class="badge badge-pill badge-${isMe}">`,
			[endIndex]: '</p>'
		});
	});

	return (
		<div className={`message${isMe}`}>
			{!isMe && <Avatar name={sender.name} type='user' tooltip='top' />}
			<div className='text-main'>
				<div className={`text-group${isMe}`}>
					<div className={`text${isMe}`}>
						<p dangerouslySetInnerHTML={{ __html: messageText }} />
					</div>
				</div>
				<span>{textDate}</span>
			</div>
		</div>
	);
}

/* eslint-enable */
