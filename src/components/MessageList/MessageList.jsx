/* jshint esversion: 10 */
/* eslint-disable */

import React, { createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterRoom } from '../../actions';

import NoMessages from './NoMessages';
import Message from './Message';

export default function MessageList({ match }) {
	const { roomUsers, messages, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	const { roomId } = match.params;
	const roomNotFound = !roomUsers.length;
	const messagesNode = createRef();

	useEffect(() => {
		dispatch(enterRoom(roomId));
	}, [roomId]);

	useEffect(() => {
		messagesNode.current.scrollTop = messagesNode.current.scrollHeight;
	}, [isLoading]);

	useEffect(() => {
		console.log(messagesNode.current);
		if (document.hasFocus() && roomId)
			messagesNode.current.scrollTop = messagesNode.current.scrollHeight;
	}, [messages]);

	const onShowMessage = () => {
		if (messages.length === 0 && !isLoading && !roomNotFound)
			return <NoMessages title='Bắt đầu cuộc trò chuyện mới...' />;
		else if (isLoading) return <NoMessages title='Đang tải, đợi chút !' />;
		else if (!isLoading && roomNotFound)
			return <NoMessages title='404 Not Found :(' />;
		return messages.map(message => {
			const { id, sender, createdAt, text } = message;
			return (
				<Message
					key={id}
					sender={sender}
					createdAt={createdAt}
					text={text}
				/>
			);
		});
	};

	return (
		<div className='col-md-12' ref={messagesNode}>
			{onShowMessage()}
		</div>
	);
}

/* eslint-enable */
