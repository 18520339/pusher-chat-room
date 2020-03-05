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
	GridLayout
} from '@andyet/simplewebrtc';

import { key, SWRTC_CONFIG_URL } from '../../config';
import { toggleCall } from '../../actions';

import ConnectStatus from './ConnectStatus';
import Options from './Options';

export default function CallBySWRTC() {
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
				<Provider configUrl={SWRTC_CONFIG_URL}>
					<Connecting>
						<ConnectStatus status='Đang kết nối' />
					</Connecting>
					<Disconnected>
						<ConnectStatus status='Không có kết nối' />
					</Disconnected>
					<Connected>
						<RemoteAudioPlayer />
						<RequestUserMedia audio auto />
						<Room roomAddress={id} name={name} password={key}>
							{({ localMedia, remoteMedia }) => {
								const remoteStream = remoteMedia.filter(
									m => m.kind === 'video'
								);
								const localStream = localMedia.filter(
									m => m.kind === 'video' && m.shared
								);
								return (
									<GridLayout
										className='w-100'
										items={[
											localStream[0],
											...remoteStream
										]}
										renderCell={item => (
											<Video media={item} />
										)}
									/>
								);
							}}
						</Room>
						<Options />
					</Connected>
				</Provider>
			</div>
		</NewWindow>
	);
}

/* eslint-enable */
