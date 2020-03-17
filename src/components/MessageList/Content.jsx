/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import LinkPreview from './LinkPreview';

export default function Content({ currentUserName, text }) {
	const { roomUsers } = useSelector(state => state);
	const insertTextAtIndices = (text, obj) => {
		return text.replace(/./g, (character, index) => {
			return obj[index] ? obj[index] + character : character;
		});
	};

	let messageText = text;
	const urlMatches = text.match(/\b(http|https)?:\/\/\S+/gi) || [];
	const mentions = text.match(/@[a-zA-Z0-9]+/g) || [];

	const roomUserNames = roomUsers.map(user => `@${user.name}`);
	const mentionedUsers = mentions.filter(username =>
		roomUserNames.includes(username)
	);

	urlMatches.forEach(link => {
		const startIndex = text.indexOf(link);
		const endIndex = startIndex + link.length;

		messageText = insertTextAtIndices(messageText, {
			[startIndex]: `<a class="embedded-link" href="${link}" target="_blank">`,
			[endIndex]: '</a>'
		});
	});

	mentionedUsers.forEach(user => {
		const startIndex = messageText.indexOf(user);
		const endIndex = startIndex + user.length;
		const isMe = currentUserName === user.substring(1) ? 'danger' : 'info';

		messageText = insertTextAtIndices(messageText, {
			[startIndex]: `<span class="badge badge-pill badge-${isMe}">`,
			[endIndex]: '</span>'
		});
	});

	return (
		<Fragment>
			<p dangerouslySetInnerHTML={{ __html: messageText }} />
			<LinkPreview urlMatches={urlMatches} />
		</Fragment>
	);
}

/* eslint-enable */
