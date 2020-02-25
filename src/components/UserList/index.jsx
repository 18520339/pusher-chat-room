/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SearchName, FilterGroup } from '../FormControls';
import Avatar from '../Avatar';

export default function UserList({ match }) {
	const { roomActive, roomUsers } = useSelector(state => state);
	const { name, createdByUserId } = roomActive;

	return (
		<div className='sidebar'>
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
					<SearchName placeholder='Tìm kiếm thành viên...' />
					<FilterGroup groups={['Online', 'Offline']} />
					<div className='contacts'>
						<h1>Thành viên</h1>
						<div className='list-group'>
							{roomUsers.map(user => {
								const { id, name, presence, createdAt } = user;
								const createdDate = new Date(
									createdAt
								).toLocaleDateString('vi-VN', {
									year: '2-digit',
									month: 'numeric'
								});
								return (
									<Link
										key={id}
										to={`${match.path}/${id}`}
										className='contact'
									>
										<Avatar
											name={name}
											type='user'
											tooltip='top'
										/>
										<div className='status'>
											<i
												className={`material-icons ${presence.state}`}
											>
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
											<i className='material-icons'>
												person
											</i>
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
