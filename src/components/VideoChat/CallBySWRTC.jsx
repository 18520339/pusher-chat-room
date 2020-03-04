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
	Audio,
	VolumeMeter,
	GridLayout
} from '@andyet/simplewebrtc';

import { SWRTC_CONFIG_URL } from '../../config';
import { toggleCall } from '../../actions';
import ConnectStatus from './ConnectStatus';

export default function CallBySWRTC({ userData }) {
	const { id, name } = useSelector(state => state.roomActive);
	const dispatch = useDispatch();
	const onUnload = () => dispatch(toggleCall());
	return (
		<NewWindow title={name} onUnload={onUnload}>
			<link
				href='https://fonts.googleapis.com/icon?family=Material+Icons'
				rel='stylesheet'
			></link>
			<div className='call'>
				<Provider configUrl={SWRTC_CONFIG_URL} userData={userData}>
					<RemoteAudioPlayer />
					<Connecting>
						<ConnectStatus status='Đang kết nối' />
					</Connecting>
					<Disconnected>
						<ConnectStatus status='Không có kết nối' />
					</Disconnected>
					<Connected>
						<RequestUserMedia audio video auto />
						<Room name={id}>
							{({ localMedia, remoteMedia }) => {
								const localVideos = localMedia.filter(
									m => m.kind === 'video'
								);

								const remoteVideos = remoteMedia.filter(
									m => m.kind === 'video'
								);

								return (
									<GridLayout
										className='w-100'
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
