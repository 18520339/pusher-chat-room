/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCall, toggleUsersBar } from '../../actions';
import Avatar from '../Avatar';

export default function TopBar() {
	const { roomActive } = useSelector(state => state);
	const { id, name, status, isPrivate, avatarURL } = roomActive;
	const dispatch = useDispatch();

	const onShowStatus = status => {
		if (isPrivate) status = status === 'online' ? 'Online' : 'Offline';
		else status = 'Online';
		return `Đang ${status}`;
	};

	const onPhoneChat = () => {
		if (id) dispatch(toggleCall());
	};
	const onVideoChat = () => {
		if (id) dispatch(toggleCall(true));
	};
	const onShowMembers = () => {
		if (id) dispatch(toggleUsersBar());
	};

	return (
		<div className='top'>
			<div className='container'>
				<div className='col-md-12'>
					<div className='inside'>
						<Avatar
							name={name}
							type={isPrivate ? 'user' : 'room'}
							tooltip='left'
							src={avatarURL}
						/>
						<div className='status'>
							<i
								className={`material-icons ${
									isPrivate ? status : 'online'
								}`}
							>
								fiber_manual_record
							</i>
						</div>
						<div className='data'>
							<h5>{name}</h5>
							<span>{onShowStatus(status)}</span>
						</div>
						<button
							className='btn d-md-block d-none'
							onClick={onPhoneChat}
						>
							<i className='material-icons md-30'>
								phone_in_talk
							</i>
						</button>
						<button
							className='btn d-md-block d-none'
							onClick={onVideoChat}
						>
							<i className='material-icons md-36'>videocam</i>
						</button>
						<button className='btn' onClick={onShowMembers}>
							<i className='material-icons md-30'>info</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
