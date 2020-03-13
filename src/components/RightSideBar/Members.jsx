/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';
import { SortMembers } from '../FormControls';

export default function Members({ match, adminId, isPrivate }) {
	const { currentUser, rooms, roomUsers, userSort } = useSelector(
		state => state
	);

	const privateRooms = rooms
		.filter(room => room.isPrivate)
		.map(({ id, customData }) => {
			const memberIds = customData.members.map(member => member.id);
			return { id, memberIds };
		});

	const onShowMemberData = (id, createdDate) => {
		createdDate = `Được tạo vào tháng ${createdDate}`;
		if (isPrivate) return createdDate;
		return adminId === id ? 'Quản trị viên' : createdDate;
	};

	return (
		<div className='contacts'>
			<div className='sort-members'>
				<h1>
					Thành viên
					<hr />
				</h1>
				<SortMembers />
			</div>
			<div className='list-group'>
				{roomUsers
					.sort((a, b) => {
						const { by, value } = userSort;
						if (by == 'name') {
							const nameA = a.name.toLowerCase();
							const nameB = b.name.toLowerCase();

							if (nameA > nameB) return value;
							if (nameA < nameB) return -value;
							return 0;
						} else if (by == 'status') {
							const stateA = a.presence.state;
							const stateB = b.presence.state;

							if (stateA > stateB) return -value;
							if (stateA < stateB) return value;
							return 0;
						}
					})
					.map(({ id, name, presence, createdAt }) => {
						const index = privateRooms.findIndex(
							({ memberIds }) => {
								if (currentUser.id === id)
									return memberIds.length === 1;
								return (
									memberIds.includes(currentUser.id) &&
									memberIds.includes(id)
								);
							}
						);

						const state = presence.state;
						const createdDate = new Date(
							createdAt
						).toLocaleDateString('vi-VN', {
							year: '2-digit',
							month: 'numeric'
						});

						return (
							<Link
								key={id}
								to={`${match.path}/${privateRooms[index].id}`}
								className='contact'
							>
								<Avatar name={name} type='user' />
								<div className='status'>
									<i className={`material-icons ${state}`}>
										fiber_manual_record
									</i>
								</div>
								<div className='data'>
									<h5>{name}</h5>
									<p>{onShowMemberData(id, createdDate)}</p>
								</div>
								<div className='person-add'>
									<i className='material-icons'>person</i>
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
}

/* eslint-enable */
