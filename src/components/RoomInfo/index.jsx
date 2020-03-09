/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

import Avatar from '../Avatar';
import UserList from './UserList';
import { ImageList } from '../Images';

export default function RoomInfo({ match }) {
	const { showUsersBar, roomActive } = useSelector(state => state);
	const { name, createdByUserId, isPrivate } = roomActive;
	const avatarType = isPrivate ? 'user' : 'room';
	return (
		<div className={`sidebar ${!showUsersBar && 'd-none'}`}>
			<div className='container'>
				<div className='col-md-12'>
					<div className='room-info'>
						<Avatar name={name} type={avatarType} size='xl' />
						<h4>{name}</h4>
					</div>
					<hr />
					<UserList match={match} adminId={createdByUserId} />
				</div>
				<hr />
				<ImageList />
			</div>
		</div>
	);
}

/* eslint-enable */
