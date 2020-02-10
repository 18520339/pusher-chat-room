/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RoomList() {
	const { roomActive, currentRooms } = useSelector(state => state);
	return (
		<ul className='rooms-list'>
			<h3>Phòng chat</h3>
			{currentRooms.map(room => {
				const { id, name } = room;
				const isActive = roomActive.id === id ? 'active' : '';
				return (
					<li key={id} className={'list-item ' + isActive}>
						<Link to={id}># {name}</Link>
					</li>
				);
			})}
		</ul>
	);
}

/* eslint-enable */
