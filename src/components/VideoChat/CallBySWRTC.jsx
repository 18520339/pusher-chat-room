/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewWindow from 'react-new-window';
import {
	Provider,
	Connected,
	Connecting,
	Disconnected,
	Room,
	RequestUserMedia,
	RemoteAudioPlayer,
	Video,
	GridLayout
} from '@andyet/simplewebrtc';

import { SWRTC_CONFIG_URL } from '../../config';
import { toggleCall } from '../../actions';
import Connect from './Connect';

export default function CallBySWRTC({ userData }) {
	const { roomActive } = useSelector(state => state);
	const dispatch = useDispatch();
	return (
		<NewWindow center>
			<div className='call'>
				<Provider configUrl={SWRTC_CONFIG_URL} userData={userData}>
					<RemoteAudioPlayer />
					<Connecting>
						<Connect />
					</Connecting>
					<Disconnected>
						<Connect />
					</Disconnected>
					<Connected>
						<RequestUserMedia audio video auto />
						<Room name={roomActive.id}>
							{({ localMedia, remoteMedia }) => {
								const remoteVideos = remoteMedia.filter(
									m => m.kind === 'video'
								);
								const localVideos = localMedia.filter(
									m => m.kind === 'video' && m.shared
								);

								return (
									<GridLayout
										className='videogrid'
										items={[
											...localVideos,
											...remoteVideos
										]}
										renderCell={item => (
											<Video media={item} />
										)}
									/>
								);
							}}
						</Room>
					</Connected>
				</Provider>
			</div>
		</NewWindow>
	);
}

/* eslint-enable */
