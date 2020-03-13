/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';

export default function ChatList({ match, chatName, isOnline, room, type }) {
	const { roomActive } = useSelector(state => state);
	const { id, unreadCount, createdAt, lastMessageAt, customData } = room;

	const isActive = roomActive.id === id && 'active';
	const isRead = unreadCount > 0 && 'unread';

	const { lastMessage } = customData;
	const lastMessageTime = new Date(
		lastMessageAt ? lastMessageAt : createdAt
	).toLocaleDateString('vi-Vn', {
		weekday: 'narrow',
		year: '2-digit',
		month: '2-digit',
		day: '2-digit'
	});

	const showUnreadCount = unreadCount => {
		if (unreadCount > 0) {
			const color = unreadCount > 10 ? 'pink' : 'yellow';
			return (
				<div className={`new bg-${color}`}>
					<span>{unreadCount}</span>
				</div>
			);
		}
	};

	return (
		<Link
			to={`${match.path}/${id}`}
			className={`${isRead} ${isActive} single`}
		>
			<Avatar name={chatName} type={type} />
			<div className='status'>
				<i className={`material-icons ${isOnline}`}>
					fiber_manual_record
				</i>
			</div>
			<div className='data'>
				<h5>{chatName}</h5>
				<span>{lastMessageTime}</span>
				<p>{lastMessage ? lastMessage : 'Chưa có tin nhắn'}</p>
			</div>
			{showUnreadCount(unreadCount)}
		</Link>
	);
}

/* eslint-enable */
