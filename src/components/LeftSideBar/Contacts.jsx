/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

import { onGetPrivateRoom } from '../../utils';
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
						const { name, status } = onGetPrivateRoom(
							room,
							currentUser.id,
							true
						);

						if (roomFilter.status === 0)
							return name.indexOf(roomFilter.name) !== -1;
						return (
							name.indexOf(roomFilter.name) !== -1 &&
							status === roomFilter.status
						);
					})
					.map(room => {
						const { name, status, avatarURL } = onGetPrivateRoom(
							room,
							currentUser.id,
							false
						);
						return (
							<ChatList
								key={room.id}
								match={match}
								chatName={name}
								isOnline={status}
								room={room}
								type='user'
								avatarURL={avatarURL}
							/>
						);
					})}
			</div>
		</div>
	);
}

/* eslint-enable */
