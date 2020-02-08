/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { enterRoom } from '../../actions';
import Message from '../Message';

export default function MessageList(props) {
	const { messages, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	const { roomId } = props.match.params;
	const messagesNode = useRef();

	useEffect(() => {
		dispatch(enterRoom(roomId));
	}, [roomId]);

	useEffect(() => {
		if (document.hasFocus() && roomId) {
			const node = findDOMNode(messagesNode.current);
			node.scrollTop = node.scrollHeight;
		}
	}, [messages, isLoading]);

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
				messages.map(message => {
					return (
						<Message
							key={message.id}
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
