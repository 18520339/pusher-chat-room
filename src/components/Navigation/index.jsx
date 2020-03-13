/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, filterRooms } from '../../actions';

export default function Navigation() {
	const { roomFilter, currentUser } = useSelector(state => state);
	const dispatch = useDispatch();

	const { isPrivate } = roomFilter;
	const onSignOut = () => dispatch(signOut());

	return (
		<div className='navigation'>
			<div className='container'>
				<div className='inside'>
					<div className='nav nav-tab menu'>
						<button className='btn'>
							<img
								className='avatar-xl'
								src={currentUser.avatarURL}
							/>
						</button>
						<a
							type='button'
							className={`${isPrivate && 'active'}`}
							onClick={() => dispatch(filterRooms('', 0, true))}
						>
							<i className='material-icons'>account_circle</i>
						</a>
						<a
							type='button'
							className={`${!isPrivate && 'active'} f-grow1`}
							onClick={() => dispatch(filterRooms('', 0, false))}
						>
							<i className='material-icons active'>
								chat_bubble_outline
							</i>
						</a>
						<button className='btn mode'>
							<i className='material-icons'>brightness_2</i>
						</button>
						<button className='btn power' onClick={onSignOut}>
							<i className='material-icons'>power_settings_new</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
