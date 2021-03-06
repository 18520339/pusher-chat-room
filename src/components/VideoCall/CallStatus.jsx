/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCall } from '../../actions';
import Avatar from '../Avatar';
import Options from './Options';

export default function CallStatus({ value }) {
	const { name, isPrivate, avatarURL } = useSelector(
		state => state.roomActive
	);
	const dispatch = useDispatch();

	const avatarType = isPrivate ? 'user' : 'room';
	const onCloseCall = () => dispatch(toggleCall());

	return (
		<div className='content'>
			<div className='container'>
				<div className='col-md-12'>
					<div className='inside'>
						<div className='panel'>
							<div className='participant'>
								<Avatar
									name={name}
									type={avatarType}
									tooltip='bottom'
									src={avatarURL}
									size='xxl'
								/>
								<span>{value}</span>
							</div>
							<Options />
							<button className='btn back' onClick={onCloseCall}>
								<i className='material-icons md-24'>chat</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
