/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React from 'react';
import { useDispatch } from 'react-redux';
import {
	RequestDisplayMedia,
	RequestUserMedia,
	MediaControls
} from '@andyet/simplewebrtc';

import { toggleCall } from '../../actions';
import LocalOptions from './LocalOptions';

export default function Options({ localVideos, localScreen }) {
	const dispatch = useDispatch();
	return (
		<LocalOptions>
			{localVideos && localVideos.length ? (
				<MediaControls
					media={localVideos[0]}
					autoRemove
					render={({ remove }) => (
						<button className='btn option' onClick={remove}>
							<i className='material-icons md-30'>videocam_off</i>
						</button>
					)}
				/>
			) : (
				<RequestUserMedia
					video
					audio
					render={getUserMedia => (
						<button className='btn option' onClick={getUserMedia}>
							<i className='material-icons md-30'>videocam</i>
						</button>
					)}
				/>
			)}
			<button
				className='btn option call-end'
				onClick={() => dispatch(toggleCall())}
			>
				<i className='material-icons md-30'>call_end</i>
			</button>
			{localScreen ? (
				<MediaControls
					media={localScreen}
					autoRemove
					render={({ stopSharing }) => (
						<button className='btn option' onClick={stopSharing}>
							<i className='material-icons md-30'>
								stop_screen_share
							</i>
						</button>
					)}
				/>
			) : (
				<RequestDisplayMedia
					render={getDisplayMedia => (
						<button
							className='btn option'
							onClick={getDisplayMedia}
						>
							<i className='material-icons md-30'>screen_share</i>
						</button>
					)}
				/>
			)}
		</LocalOptions>
	);
}

/* eslint-enable */
