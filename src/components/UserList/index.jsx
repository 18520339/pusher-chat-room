/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AES } from 'crypto-js';

import { key } from '../../config';
import Avatar from '../Avatar';
import { SortMembers } from '../FormControls';

export default function UserList({ match }) {
	const { roomActive, roomUsers, userSort, showUsersBar } = useSelector(state => state);
	const { name, createdByUserId } = roomActive;

	return (
		<div className={`sidebar ${!showUsersBar && 'd-none'}`}>
			<div className='container'>
				<div className='col-md-12'>
					<div className='info'>
						<img
							className='avatar-xl'
							src={`https://avatars.dicebear.com/v2/jdenticon/${name}.svg`}
							alt={name}
						/>
						<h4>{name}</h4>
					</div>
					<div className='contacts'>
						<div className='sort-members'>
							<h1>Thành viên</h1>
							<SortMembers />
						</div>
						<div className='list-group'>
							{roomUsers
								.sort((a, b) => {
									const { by, value } = userSort;
									if (by == 'name') {
										if (a.name.toLowerCase() > b.name.toLowerCase())
											return value;
										if (a.name.toLowerCase() < b.name.toLowerCase())
											return -value;
										return 0;
									} else if (by == 'status') {
										if (a.presence.state > b.presence.state)
											return -value;
										if (a.presence.state < b.presence.state)
											return value;
										return 0;
									}
								})
								.map(user => {
									const { id, name, presence, createdAt } = user;
									const path = AES.encrypt(
										id + '@!?#?', key
									).toString().replace('/', '').substr(0, 36);
									const createdDate = new Date(
										createdAt
									).toLocaleDateString('vi-VN', {
										year: '2-digit',
										month: 'numeric'
									});
									return (
										<Link key={id} to={`${match.path}/${path}`} className='contact'>
											<Avatar name={name} type='user' tooltip='top' />
											<div className='status'>
												<i className={`material-icons ${presence.state}`}>
													fiber_manual_record
												</i>
											</div>
											<div className='data'>
												<h5>{name}</h5>
												<p>
													{createdByUserId === id
														? 'Quản trị viên'
														: `Được tạo vào tháng ${createdDate}`}
												</p>
											</div>
											<div className='person-add'>
												<i className='material-icons'>person</i>
											</div>
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
