/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';
import DropDown from './DropDown';

export default function TopBar() {
	const { name } = useSelector(state => state.roomActive);
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
						<button className='btn connect d-md-block d-none'>
							<i className='material-icons md-30'>
								phone_in_talk
							</i>
						</button>
						<button className='btn connect d-md-block d-none'>
							<i className='material-icons md-36'>videocam</i>
						</button>
						<button className='btn d-md-block d-none'>
							<i className='material-icons md-30'>info</i>
						</button>
						<DropDown />
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
