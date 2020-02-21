/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SearchName, SortGroup } from '../FormControls';
import Avatar from '../Avatar';
import RoomBrief from './RoomBrief';

export default function RoomList({ match }) {
	const { currentUser, rooms, roomActive } = useSelector(state => state);
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
					<SearchName placeholder='Tìm kiếm phòng chat...' />
					<SortGroup groups={['Đã đọc', 'Chưa đọc']} />
					<button className='btn create'>
						<i className='material-icons'>create</i>
					</button>
					<div className='discussions'>
						<h1>Các phòng chat</h1>
						<div className='list-group'>
							{rooms.map(room => {
								const { id, name, userIds, unreadCount } = room;
								const isJoined = userIds
									? userIds.find(id => currentUser.id === id)
									: userIds;
								return (
									<Link
										key={id}
										to={`${match.path}/${id}`}
										className={`${
											unreadCount > 0 ? 'unread' : ''
										} single ${
											roomActive.id === id ? 'active' : ''
										}`}
									>
										<Avatar
											name={name}
											type='room'
											tooltip='top'
										/>
										<div className='status'>
											<i
												className={`material-icons ${
													isJoined ? 'online' : ''
												}`}
											>
												fiber_manual_record
											</i>
										</div>
										<RoomBrief roomId={id} name={name} />
										{onUnreadCount(unreadCount)}
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
