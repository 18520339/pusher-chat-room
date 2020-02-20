/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { alertError } from '../../functions';

export default function RoomBrief(props) {
	const { chatkit, currentUser } = useSelector(state => state);
	const [lastMessage, setLastMessage] = useState({
		sender: { id: '', name: '' },
		content: 'Tham gia để được cập nhật các tin nhắn mới nhất',
		updated_at: 'Được đề xuất'
	});

	const { roomId, name } = props;
	const onShowLastMessage = () => {
		const { sender, content } = lastMessage;
		const { id, name } = sender;
		return (
			<p>
				{currentUser.id === id ? 'Bạn: ' : name}
				{content}
			</p>
		);
	};

	useEffect(() => {
		chatkit
			.fetchMultipartMessages({ roomId, limit: 1 })
			.then(message => {
				if (message.length) {
					const { user_id, parts, updated_at } = message[0];
					chatkit.getUser({ id: user_id }).then(user => {
						const { id, name } = user;
						setLastMessage({
							...lastMessage,
							sender: { id, name: `${name}: ` },
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
			})
			.catch(err => alertError('Error on fetching message', err));
	}, []);

	return (
		<div className='data'>
			<h5>{name}</h5>
			<span>{lastMessage.updated_at}</span>
			{onShowLastMessage()}
		</div>
	);
}

/* eslint-enable */
