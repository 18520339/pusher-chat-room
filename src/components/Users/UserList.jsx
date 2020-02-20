/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function UserList() {
	const { roomUsers } = useSelector(state => state);
	return (
		<ul className='online-list'>
			<h3>Hoạt Động</h3>
			{roomUsers.map(user => {
				const { id, name, presence } = user;
				const state = presence.state === 'online' ? 'fas' : 'far';

				return (
					<li key={id} className='list-item'>
						<a href='#'>
							<i className={`${state} fa-circle`}></i>
							&ensp; {name}
						</a>
					</li>
				);
			})}
		</ul>
	);
}

/* eslint-enable */
