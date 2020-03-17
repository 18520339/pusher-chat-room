/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React from 'react';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';

export default function Rooms({ match }) {
	const { currentUser, rooms, roomFilter } = useSelector(state => state);
	return (
		<div className='discussions'>
			<h1>Các phòng chat</h1>
			<div className='list-group'>
				{rooms
					.filter(room => {
						if (!room.id) return;
						return !room.isPrivate;
					})
					.filter(({ name, unreadCount }) => {
						const roomName = name.toLowerCase();
						const roomStatus = unreadCount === 0 ? 1 : -1;

						if (roomFilter.status === 0)
							return roomName.indexOf(roomFilter.name) !== -1;
						return (
							roomName.indexOf(roomFilter.name) !== -1 &&
							roomStatus === roomFilter.status
						);
					})
					.sort((a, b) => {
						const lastMessageA = new Date(a.lastMessageAt);
						const lastMessageB = new Date(b.lastMessageAt);
						return lastMessageB - lastMessageA;
					})
					.map(room => {
						const { id, name, userIds } = room;
						const isOnline =
							userIds &&
							userIds.find(id => currentUser.id === id);
						return (
							<ChatList
								key={id}
								match={match}
								chatName={name}
								isOnline={`${isOnline && 'online'}`}
								room={room}
								type='room'
							/>
						);
					})}
			</div>
		</div>
	);
}

/* eslint-enable */
