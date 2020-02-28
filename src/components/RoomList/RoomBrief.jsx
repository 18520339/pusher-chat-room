/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function RoomBrief(props) {
	const { chatkit, screen, currentUser, roomActive, messages } = useSelector(
		state => state
	);
	const [lastMessage, setLastMessage] = useState({
		sender: { id: '', name: '' },
		content: 'Chưa có tin nhắn',
		updated_at: 'Được đề xuất'
	});
	const { id, name } = props;

	const fetchLastMessage = async () => {
		await chatkit
			.fetchMultipartMessages({ roomId: id, limit: 1 })
			.then(message => {
				if (message.length) {
					const { user_id, parts, updated_at } = message[0];
					chatkit.getUser({ id: user_id }).then(user => {
						setLastMessage({
							...lastMessage,
							sender: { id: user.id, name: `${user.name}: ` },
							content: parts[0].content,
							updated_at: new Date(updated_at).toLocaleDateString(
								'vi-Vn',
								{
									weekday: 'narrow',
									year: '2-digit',
									month: '2-digit',
									day: '2-digit'
								}
							)
						});
					});
				}
			});
	};

	const onShowLastMessage = () => {
		const { sender, content } = lastMessage;
		return (
			<p>
				{currentUser.id === sender.id ? 'Bạn: ' : sender.name}
				{content}
			</p>
		);
	};

	useEffect(() => {
		if (
			screen.currentScreen === 'Chat' &&
			roomActive.id &&
			messages.length > 0
		)
			fetchLastMessage();
	}, [roomActive, messages]);

	return (
		<div className='data'>
			<h5>{name}</h5>
			<span>{lastMessage.updated_at}</span>
			{onShowLastMessage()}
		</div>
	);
}

/* eslint-enable */
