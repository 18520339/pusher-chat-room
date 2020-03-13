/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

import { onGetPrivateUser } from '../../functions';
import ChatList from './ChatList';

export default function Contacts({ match }) {
	const { currentUser, rooms, roomFilter } = useSelector(state => state);
	return (
		<div className='discussions'>
			<h1>Danh sách liên hệ</h1>
			<div className='list-group'>
				{rooms
					.filter(room => {
						if (!room.id) return;
						return room.isPrivate;
					})
					.filter(room => {
						const { roomName, roomStatus } = onGetPrivateUser(
							room,
							currentUser.id,
							true
						);
						if (roomFilter.status === 0)
							return roomName.indexOf(roomFilter.name) !== -1;
						return (
							roomName.indexOf(roomFilter.name) !== -1 &&
							roomStatus === roomFilter.status
						);
					})
					.map(room => {
						const { roomName, roomStatus } = onGetPrivateUser(
							room,
							currentUser.id,
							false
						);
						return (
							<ChatList
								key={room.id}
								match={match}
								chatName={roomName}
								isOnline={roomStatus}
								room={room}
								type='user'
							/>
						);
					})}
			</div>
		</div>
	);
}

/* eslint-enable */
