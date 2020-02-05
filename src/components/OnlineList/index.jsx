/* jshint esversion: 9 */
/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

export default function OnlineList(props) {
	return (
		<ul className='online-list'>
			<hr />
			<h3>Đang Online</h3>
			{props.users &&
				props.users.map((user, index) => {
					const { id, name, presence } = user;
					const state = presence.state === 'online' ? 'online' : 'offline';
					return (
						<li key={index} className='list-item'>
							<Link to={id}>
								{name} ({state})
							</Link>
						</li>
					);
				})}
		</ul>
	);
}

/* eslint-enable */
