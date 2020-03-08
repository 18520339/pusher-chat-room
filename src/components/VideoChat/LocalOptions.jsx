/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { UserControls } from '@andyet/simplewebrtc';

export default function LocalOptions({ children }) {
	return (
		<UserControls
			render={({
				isMuted,
				isPaused,
				mute,
				unmute,
				resumeVideo,
				pauseVideo
			}) => (
				<div className='options'>
					<button
						className='btn option'
						onClick={() =>
							isPaused ? resumeVideo() : pauseVideo()
						}
					>
						<i className='material-icons md-30'>
							{isPaused ? 'play_arrow' : 'pause'}
						</i>
					</button>
					{children}
					<button
						className='btn option'
						onClick={() => (isMuted ? unmute() : mute())}
					>
						<i className='material-icons md-30'>
							{isMuted ? 'volume_off' : 'volume_up'}
						</i>
					</button>
				</div>
			)}
		/>
	);
}
