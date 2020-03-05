/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCall } from '../../actions';

export default function Options() {
	const dispatch = useDispatch();
	const onPause = () => {};
	const onVideoCam = () => {};
	const onCallEnd = () => dispatch(toggleCall());
	const onScreenShare = () => {};
	const onVolumeUp = () => {};

	return (
		<div className='options'>
			<button className='btn option' onClick={onPause}>
				<i className='material-icons md-30'>pause</i>
			</button>
			<button className='btn option' onClick={onVideoCam}>
				<i className='material-icons md-30'>videocam</i>
			</button>
			<button className='btn option call-end' onClick={onCallEnd}>
				<i className='material-icons md-30'>call_end</i>
			</button>
			<button className='btn option' onClick={onScreenShare}>
				<i className='material-icons md-30'>screen_share</i>
			</button>
			<button className='btn option' onClick={onVolumeUp}>
				<i className='material-icons md-30'>volume_up</i>
			</button>
		</div>
	);
}

/* eslint-enable */
