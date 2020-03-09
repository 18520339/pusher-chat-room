/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewWindow from 'react-new-window';
import {
	Room,
	Video,
	Provider,
	Connected,
	GridLayout,
	Connecting,
	Disconnected,
	RequestUserMedia,
	RemoteAudioPlayer
} from '@andyet/simplewebrtc';

import { key, SWRTC_CONFIG_URL } from '../../config';
import { toggleCall } from '../../actions';

import CallStatus from './CallStatus';
import Options from './Options';

export default function VideoCall() {
	const { roomActive, videoCall } = useSelector(state => state);
	const dispatch = useDispatch();

	const { id, name } = roomActive;
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
						<CallStatus value='Đang kết nối' />
					</Connecting>
					<Disconnected>
						<CallStatus value='Không có kết nối' />
					</Disconnected>
					<Connected>
						<RemoteAudioPlayer />
						<RequestUserMedia audio auto />
						{videoCall.cam && <RequestUserMedia video auto />}
						<Room roomAddress={id} name={name} password={key}>
							{({ localMedia, remoteMedia }) => {
								const remoteVideos = remoteMedia.filter(
									m => m.kind === 'video'
								);
								const localVideos = localMedia.filter(
									m => m.kind === 'video' && m.shared
								);
								const localScreens = localVideos.filter(
									m => m.screenCapture
								);
								return (
									<div className='video-chat'>
										<GridLayout
											className='w-100'
											items={[
												localVideos[0],
												...localScreens,
												...remoteVideos
											]}
											renderCell={item =>
												item && <Video media={item} />
											}
										/>
										<Options
											localVideos={localVideos}
											localScreen={localScreens[0]}
										/>
									</div>
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
