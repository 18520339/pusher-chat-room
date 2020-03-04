/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCall } from '../../actions';

export default function Options() {
	const dispatch = useDispatch();
	const onCloseCall = () => dispatch(toggleCall());
	return (
		<div className='options'>
			<button className='btn option'>
				<i className='material-icons md-30'>mic</i>
			</button>
			<button className='btn option'>
				<i className='material-icons md-30'>videocam</i>
			</button>
			<button className='btn option call-end'>
				<i className='material-icons md-30'>call_end</i>
			</button>
			<button className='btn option'>
				<i className='material-icons md-30'>screen_share</i>
			</button>
			<button className='btn option'>
				<i className='material-icons md-30'>volume_up</i>
			</button>
		</div>
	);
}

/* eslint-enable */
