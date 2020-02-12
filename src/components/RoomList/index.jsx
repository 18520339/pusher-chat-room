/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RoomList() {
	const { rooms, roomActive } = useSelector(state => state);
	return (
		<ul className='rooms-list'>
			<h3>Phòng chat</h3>
			{rooms.map(room => {
				const { id, name, unreadCount } = room;
				const isActive = roomActive.id === id ? 'active' : '';
				return (
					<li key={id} className={'list-item ' + isActive}>
						<Link to={id}>
							# {name} &ensp;
							{unreadCount > 0 ? (
								<span className='unread'>{unreadCount}</span>
							) : null}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

/* eslint-enable */
