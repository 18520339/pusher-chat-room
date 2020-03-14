/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Dialog from './Dialog';
import { createRoom } from '../../actions';

export default function CreateRoom() {
	const dispatch = useDispatch();
	const [roomInfo, setRoomInfo] = useState({ name: '', firstMessage: '' });

	const onChange = event => {
		const target = event.target;
		const { name, value } = target;
		setRoomInfo({ ...roomInfo, [name]: value });
	};

	const onSubmit = () => {
		const { name, firstMessage } = roomInfo;
		if (name.trim()) {
			dispatch(createRoom(name, firstMessage));
			setRoomInfo({ ...roomInfo, name: '', firstMessage: '' });
		}
	};

	return (
		<Dialog
			type='create'
			icon='create'
			title='Tạo phòng mới'
			onSubmit={onSubmit}
		>
			<div className='form-group'>
				<label>Tên phòng:</label>
				<input
					type='text'
					name='name'
					value={roomInfo.name}
					className='form-control'
					placeholder='Đặt tên phòng...'
					onChange={onChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Tin nhắn:</label>
				<textarea
					name='firstMessage'
					value={roomInfo.firstMessage}
					className='text-control'
					placeholder='Nhập tin nhắn đầu tiên của bạn...'
					onChange={onChange}
				></textarea>
			</div>
		</Dialog>
	);
}

/* eslint-enable */
