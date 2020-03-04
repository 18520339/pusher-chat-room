/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCall } from '../../actions';
import Avatar from '../Avatar';

export default function Connect({ status }) {
	const { name, isPrivate } = useSelector(state => state.roomActive);
	const dispatch = useDispatch();

	const avatarType = isPrivate ? 'user' : 'room';
	const options = ['mic', 'videocam', 'call_end', 'person_add', 'volume_up'];
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
									size='xxl'
								/>
								<span>{status}</span>
							</div>
							<div className='options'>
								{options.map((opt, index) => (
									<button
										key={index}
										className={`btn option 
											${opt.replace('_', '-')}
										`}
										onClick={onCloseCall}
									>
										<i className='material-icons md-30'>
											{opt}
										</i>
									</button>
								))}
							</div>
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
