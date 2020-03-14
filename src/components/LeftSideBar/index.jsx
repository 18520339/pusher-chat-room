/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

import { FilterRooms } from '../FormControls';
import { CreateRoom } from '../PopUp';

import Contacts from './Contacts';
import Rooms from './Rooms';

export { default as RoomStatus } from './RoomStatus';
export function LeftSideBar({ match }) {
	const { isPrivate } = useSelector(state => state.roomFilter);
	return (
		<div className='sidebar'>
			<div className='container'>
				<div className='col-md-12'>
					<FilterRooms
						placeholder={
							isPrivate
								? 'Tìm kiếm liên hệ...'
								: 'Tìm kiếm phòng chat...'
						}
					/>
					{!isPrivate && <CreateRoom />}
					{isPrivate ? (
						<Contacts match={match} />
					) : (
						<Rooms match={match} />
					)}
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
