/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CreateRoom, FilterRooms } from '../FormControls';
import Avatar from '../Avatar';

export { default as RoomStatus } from './RoomStatus';
export function RoomList({ match }) {
	const { currentUser, rooms, roomActive, roomFilter } = useSelector(
		state => state
	);
	const onUnreadCount = unreadCount => {
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
		<div className='sidebar'>
			<div className='container'>
				<div className='col-md-12'>
					<FilterRooms />
					<CreateRoom />
					<div className='discussions'>
						<h1>Các phòng chat</h1>
						<div className='list-group'>
							{rooms
								.filter(room => {
									if (!room.id) return;
									const roomName = room.name.toLowerCase();
									const roomStatus = room.unreadCount > 0 ? -1 : 1;
									const { name, status } = roomFilter;

									if (status === 0)
										return roomName.indexOf(name) !== -1;
									return (
										roomName.indexOf(name) !== -1 &&
										roomStatus === status
									);
								})
								.sort((a, b) => {
									const lastMessageA = new Date(a.lastMessageAt);
									const lastMessageB = new Date(b.lastMessageAt);
									return lastMessageB - lastMessageA;
								})
								.map(
									({
										id,
										name,
										userIds,
										unreadCount,
										isPrivate,
										createdAt,
										lastMessageAt,
										customData
									}) => {
										const active = roomActive.id === id && 'active';
										const isJoined = userIds && userIds.find(
											id => currentUser.id === id
										);

										const avatarType = isPrivate ? 'user' : 'room';
										const unread = unreadCount > 0 && 'unread';

										const { lastMessage } = customData;
										const lastMessageTime = new Date(
											lastMessageAt ? lastMessageAt : createdAt
										).toLocaleDateString('vi-Vn', {
											weekday: 'narrow',
											year: '2-digit',
											month: '2-digit',
											day: '2-digit'
										});

										return (
											<Link
												key={id}
												to={`${match.path}/${id}`}
												className={`${unread} ${active} single`}
											>
												<Avatar name={name} type={avatarType} />
												<div className='status'>
													<i className={`material-icons ${
														isJoined && 'online'}`
													}>
														fiber_manual_record
													</i>
												</div>
												<div className='data'>
													<h5>{name}</h5>
													<span>{lastMessageTime}</span>
													<p>
														{lastMessage
															? lastMessage
															: 'Chưa có tin nhắn'}
													</p>
												</div>
												{onUnreadCount(unreadCount)}
											</Link>
										);
									}
								)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
