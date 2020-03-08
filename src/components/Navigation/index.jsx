/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../actions';

export default function Navigation() {
	const { avatarURL } = useSelector(state => state.currentUser);
	const dispatch = useDispatch();
	const onSignOut = () => dispatch(signOut());
	return (
		<div className='navigation'>
			<div className='container'>
				<div className='inside'>
					<div className='nav nav-tab menu'>
						<button className='btn'>
							<img className='avatar-xl' src={avatarURL} />
						</button>
						<a
							href='#discussions'
							className='active f-grow1'
							data-toggle='tab'
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
