/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCall, toggleCallOption } from '../../actions';

export default function Options() {
	const { pause, cam, screenShare, mute } = useSelector(
		state => state.videoChat
	);
	const dispatch = useDispatch();

	const onPause = () => {
		dispatch(toggleCallOption('pause'));
	};
	const onVideoCam = () => {
		dispatch(toggleCallOption('cam'));
	};
	const onCallEnd = () => {
		dispatch(toggleCall());
	};
	const onScreenShare = () => {
		dispatch(toggleCallOption('screenShare'));
	};
	const onVolumeUp = () => {
		dispatch(toggleCallOption('mute'));
	};

	return (
		<div className='options'>
			<button className='btn option' onClick={onPause}>
				<i className='material-icons md-30'>
					{pause ? 'play_arrow' : 'pause'}
				</i>
			</button>
			<button className='btn option' onClick={onVideoCam}>
				<i className='material-icons md-30'>
					{cam ? 'videocam_off' : 'videocam'}
				</i>
			</button>
			<button className='btn option call-end' onClick={onCallEnd}>
				<i className='material-icons md-30'>call_end</i>
			</button>
			<button className='btn option' onClick={onScreenShare}>
				<i className='material-icons md-30'>
					{screenShare ? 'stop_screen_share' : 'screen_share'}
				</i>
			</button>
			<button className='btn option' onClick={onVolumeUp}>
				<i className='material-icons md-30'>
					{mute ? 'volume_off' : 'volume_up'}
				</i>
			</button>
		</div>
	);
}

/* eslint-enable */
