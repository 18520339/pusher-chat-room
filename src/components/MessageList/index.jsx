/* jshint esversion: 9 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import Message from '../Message';

export default function MessageList(props) {
	const { roomId, messages, currentUser, onEnterRoom, isLoading } = props;
	const messagesNode = useRef();

	useEffect(() => {
		onEnterRoom(roomId);
	}, []);

	useEffect(() => {
		if (document.hasFocus() && roomId) {
			const node = findDOMNode(messagesNode.current);
			node.scrollTop = node.scrollHeight;
		}
	}, [messages, roomId, isLoading]);

	return (
		<ul className='message-list' ref={messagesNode}>
			{messages.length === 0 && !isLoading ? (
				<li className='join-room'>
					<span>Bắt đầu cuộc trò chuyện mới...</span>
				</li>
			) : isLoading ? (
				<li className='join-room'>
					<span>
						<i className='fas fa-spinner fa-pulse'></i>
						&ensp; Đang tải, đợi chút !
					</span>
				</li>
			) : (
				messages.map((message, index) => {
					return (
						<Message
							key={message.id}
							currentUser={currentUser}
							sender={message.sender}
							text={message.text}
						/>
					);
				})
			)}
		</ul>
	);
}

/* eslint-enable */
