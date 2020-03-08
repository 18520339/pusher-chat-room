/* jshint esversion: 10 */
/* eslint-disable */

import { NEWS_API_KEY } from '../config';
import { START_LOAD_MORE, END_LOAD_MORE } from '../constants';

import { alertError } from '../functions';
import { showNotification } from './notification';

export const typingMessage = () => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.isTypingIn({ roomId: roomActive.id })
		.catch(err => alertError('Error on typing rooms', err));
};

export const sendMessage = (parts, roomId = null) => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	if (roomId === null) roomId = `${roomActive.id}`;
	currentUser
		.sendMultipartMessage({ roomId, parts })
		.catch(err => alertError('Error on sending message', err));
};

export const sendNews = query => (dispatch, getState) => {
	const newsApi = `https://newsapi.org/v2/everything?q=${query}&pageSize=3&apiKey=${NEWS_API_KEY}`;
	fetch(newsApi)
		.then(res => res.json())
		.then(data => {
			const parts = [];
			data.articles.forEach(article => {
				const { title, source, url } = article;
				parts.push({
					type: 'text/plain',
					content: `${title} - ${source.name} - ${url}`
				});
			});
			dispatch(sendMessage(parts));
		})
		.catch(err => alertError('Error on fetching newsapi', err));
};

export const fetchLastMessage = () => {
	return (dispatch, getState) => {
		const { currentUser, messages } = getState();
		const { room, sender, parts } = messages[messages.length - 1];

		const { partType, payload } = parts[parts.length - 1];
		var lastMessage = `: ${payload.content}`;

		if (partType === 'attachment') lastMessage = ' đã gửi 1 ảnh';
		else if (partType === 'url') lastMessage = ' đã gửi 1 liên kết';
		lastMessage = `${sender.name}${lastMessage}`;

		currentUser
			.updateRoom({
				roomId: room.id,
				customData: { lastMessage }
			})
			.then(() => {
				if (currentUser.id !== sender.id)
					dispatch(showNotification(room.name, lastMessage));
			});
	};
};

export const loadMoreMessages = () => (dispatch, getState) => {
	dispatch({ type: START_LOAD_MORE });
	const { currentUser, messages, roomActive } = getState();
	if (messages.length === 0) return;
	const oldestMessageId = Math.min(...messages.map(message => message.id));

	currentUser
		.fetchMultipartMessages({
			roomId: roomActive.id,
			initialId: oldestMessageId,
			direction: 'older',
			limit: 10
		})
		.then(messages => dispatch({ type: END_LOAD_MORE, messages }));
};
