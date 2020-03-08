/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCall, toggleUsersBar } from '../../actions';
import Avatar from '../Avatar';

export default function TopBar() {
	const { id, name, isPrivate } = useSelector(state => state.roomActive);
	const dispatch = useDispatch();
	const avatarType = isPrivate ? 'user' : 'room';

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
						<Avatar name={name} type={avatarType} tooltip='left' />
						<div className='status'>
							<i className='material-icons online'>
								fiber_manual_record
							</i>
						</div>
						<div className='data'>
							<h5>{name}</h5>
							<span>Active now</span>
						</div>
						<button className='btn' onClick={onPhoneChat}>
							<i className='material-icons md-30'>
								phone_in_talk
							</i>
						</button>
						<button className='btn' onClick={onVideoChat}>
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
