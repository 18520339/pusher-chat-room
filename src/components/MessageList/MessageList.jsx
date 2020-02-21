/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterRoom } from '../../actions';

import NoMessages from './NoMessages';
import Message from './Message';

export default function MessageList({ match }) {
	const { roomUsers, messages, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	const messageNode = useRef(null);
	const { roomId } = match.params;
	const roomNotFound = !roomUsers.length;

	useEffect(() => {
		dispatch(enterRoom(roomId));
	}, [roomId]);

	useEffect(() => {
		messageNode.current.scrollIntoView();
	}, [isLoading]);

	useEffect(() => {
		if (document.hasFocus() && roomId)
			messageNode.current.scrollIntoView({ behavior: 'smooth' });
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
		<div className='col-md-12'>
			{onShowMessage()}
			<div ref={messageNode} />
		</div>
	);
}

/* eslint-enable */
