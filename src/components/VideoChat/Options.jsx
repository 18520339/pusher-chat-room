/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	RequestDisplayMedia,
	MediaControls,
	UserControls
} from '@andyet/simplewebrtc';
import { toggleCall, toggleCallOption } from '../../actions';

export default function Options({ localScreens }) {
	const { pause, cam, mute } = useSelector(state => state.videoChat);
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
		if (localScreens) {
			if (localScreens.length)
				return (
					<MediaControls
						media={localScreens[0]}
						autoRemove
						render={({ stopSharingLocalMedia }) => (
							<button
								className='btn option'
								onClick={stopSharingLocalMedia}
							>
								<i className='material-icons md-30'>
									stop_screen_share
								</i>
							</button>
						)}
					/>
				);
		}
		return (
			<RequestDisplayMedia
				render={getDisplayMedia => (
					<button className='btn option' onClick={getDisplayMedia}>
						<i className='material-icons md-30'>screen_share</i>
					</button>
				)}
			/>
		);
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
			{onScreenShare()}
			<UserControls
				render={({ isMuted, mute, unmute }) => (
					<button
						className='btn option'
						onClick={() => (isMuted ? unmute() : mute())}
					>
						<i className='material-icons md-30'>
							{isMuted ? 'volume_off' : 'volume_up'}
						</i>
					</button>
				)}
			/>
		</div>
	);
}

/* eslint-enable */
