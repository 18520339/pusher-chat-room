/* jshint esversion: 9 */
/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

export default function RoomList(props) {
	const { roomId, currentRooms } = props;

	return (
		<ul className='rooms-list'>
			<h3>Phòng chat</h3>
			{currentRooms.map((room, index) => {
				const { id, name } = room;
				const isActive = room.id === roomId ? 'active' : '';

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
