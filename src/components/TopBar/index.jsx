/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUsersBar } from '../../actions';
import Avatar from '../Avatar';

export default function TopBar() {
	const { name } = useSelector(state => state.roomActive);
	const dispatch = useDispatch();
	const onShowMembers = () => dispatch(toggleUsersBar());
	return (
		<div className='top'>
			<div className='container'>
				<div className='col-md-12'>
					<div className='inside'>
						<a href='#'>
							<Avatar name={name} type='room' tooltip='bottom' />
						</a>
						<div className='status'>
							<i className='material-icons online'>
								fiber_manual_record
							</i>
						</div>
						<div className='data'>
							<h5>
								<a href='#'>{name}</a>
							</h5>
							<span>Active now</span>
						</div>
						<button className='btn'>
							<i className='material-icons md-30'>
								phone_in_talk
							</i>
						</button>
						<button className='btn'>
							<i className='material-icons md-36'>videocam</i>
						</button>
						<button
							className='btn'
							onClick={onShowMembers}
						>
							<i className='material-icons md-30'>info</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
