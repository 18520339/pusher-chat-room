/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SearchName, SortGroup } from '../FormControls';
import Avatar from '../Avatar';
import RoomBrief from './RoomBrief';

export default function RoomList({ match }) {
	const { rooms, roomActive } = useSelector(state => state);
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
					<SearchName />
					<SortGroup />
					<div className='discussions'>
						<h1>Các phòng chat</h1>
						<div className='list-group'>
							{rooms.map(room => {
								const { id, name, unreadCount } = room;
								return (
									<Link
										key={id}
										to={`${match.path}/${id}`}
										className={`unread single ${
											roomActive.id === id ? 'active' : ''
										}`}
									>
										<Avatar
											name={name}
											type='room'
											tooltip='top'
										/>
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
