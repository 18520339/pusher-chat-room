/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function MessageText(props) {
	const { roomUsers } = useSelector(state => state);
	const { currentUserName, text } = props;

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
		const isMe = currentUserName === user.substring(1) ? 'danger' : 'info';

		messageText = insertTextAtIndices(messageText, {
			[startIndex]: `<p class="badge badge-pill badge-${isMe}">`,
			[endIndex]: '</p>'
		});
	});
	return <p dangerouslySetInnerHTML={{ __html: messageText }} />;
}

/* eslint-enable */
