/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import axios from 'axios';
import { NEWS_API_URL, NEWS_API_KEY } from '../api';
import { SEND_MESSAGE, START_LOAD_MORE, END_LOAD_MORE } from '../constants';
import { alertError, getLastMessage } from '../utils';

export const typingMessage = () => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	currentUser
		.isTypingIn({ roomId: roomActive.id })
		.catch(err => alertError('Error on typing rooms', err));
};

export const sendMessage = (parts, roomId = null) => (dispatch, getState) => {
	dispatch({ type: SEND_MESSAGE });
	const { currentUser, roomActive } = getState();

	if (roomId === null) roomId = `${roomActive.id}`;
	currentUser
		.sendMultipartMessage({ roomId, parts })
		.then(() => dispatch(fetchLastMessage(parts[parts.length - 1])))
		.catch(err => alertError('Error on sending message', err));
};

export const sendNews = query => (dispatch, getState) => {
	dispatch({ type: SEND_MESSAGE });
	axios
		.get(NEWS_API_URL, {
			params: {
				q: query,
				pageSize: 3,
				apiKey: NEWS_API_KEY
			}
		})
		.then(res => {
			const parts = [];
			res.data.articles.forEach(article => {
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

export const fetchLastMessage = message => (dispatch, getState) => {
	const { currentUser, roomActive } = getState();
	const { id, customData } = roomActive;

	currentUser.updateRoom({
		roomId: id,
		customData: {
			lastMessage: getLastMessage(currentUser.name, message),
			members: customData.members
		}
	});
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
		.then(messages => {
			dispatch({ type: END_LOAD_MORE, messages });
		});
};
