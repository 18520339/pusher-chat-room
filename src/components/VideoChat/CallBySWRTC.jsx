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
	const { id, name } = useSelector(state => state.roomActive);
	const dispatch = useDispatch();
	const onUnload = () => dispatch(toggleCall());
	return (
		<NewWindow title={name} center='screen' onUnload={onUnload}>
			<link
				href='https://fonts.googleapis.com/icon?family=Material+Icons'
				rel='stylesheet'
			></link>
			<div className='call'>
				<Provider configUrl={SWRTC_CONFIG_URL} userData={userData}>
					<RemoteAudioPlayer />
					<Connecting>
						<Connect status='Đang kết nối' />
					</Connecting>
					<Disconnected>
						<Connect status='Mất kết nối' />
					</Disconnected>
					<Connected>
						<RequestUserMedia audio video auto />
						<Room name={id}>
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
						<Connect />
					</Connected>
				</Provider>
			</div>
		</NewWindow>
	);
}

/* eslint-enable */
