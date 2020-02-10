/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function OnlineList() {
	const { roomActive } = useSelector(state => state);

	return (
		<ul className='online-list'>
			<hr />
			<h3>Hoạt Động</h3>
			{roomActive.users &&
				roomActive.users.map((user, index) => {
					const { id, name, presence } = user;
					const state = presence.state === 'online' ? 'fas' : 'far';

					return (
						<li key={index} className='list-item'>
							<Link to={id}>
								<i className={`${state} fa-circle`}></i>
								&ensp; {name}
							</Link>
						</li>
					);
				})}
		</ul>
	);
}

/* eslint-enable */
