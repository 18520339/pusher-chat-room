/* jshint esversion: 10 */
/* eslint-disable */

import React, { createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { enterRoom, addEmoji } from '../../actions';
import LoadingTitle from './LoadingTitle';
import Message from './Message';

export default function MessageList(props) {
	const { roomUsers, messages, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	const { roomId } = props.match.params;
	const roomNotFound = !roomUsers.length;
	const messagesNode = createRef();

	useEffect(() => {
		dispatch(enterRoom(roomId));
	}, [roomId]);

	useEffect(() => {
		messagesNode.current.scrollTop = messagesNode.current.scrollHeight;
	}, [isLoading]);

	useEffect(() => {
		if (document.hasFocus() && roomId)
			messagesNode.current.scrollTop = messagesNode.current.scrollHeight;
	}, [messages]);

	const onShowMessage = () => {
		if (messages.length === 0 && !isLoading && !roomNotFound)
			return <LoadingTitle value='Bắt đầu cuộc trò chuyện mới...' />;
		else if (isLoading && !roomNotFound)
			return <LoadingTitle value='&ensp; Đang tải, đợi chút !' />;
		else if (!isLoading && roomNotFound)
			return <LoadingTitle value='404 Not Found :(' />;
		return messages.map(message => {
			const { id, sender, text } = message;
			return <Message key={id} sender={sender} text={text} />;
		});
	};

	return (
		<ul className='message-list' ref={messagesNode}>
			{onShowMessage()}
		</ul>
	);
}

/* eslint-enable */
