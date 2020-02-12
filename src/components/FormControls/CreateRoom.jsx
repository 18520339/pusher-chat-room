/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRoom } from '../../actions';

export default function CreateRoom() {
	const dispatch = useDispatch();
	const [roomName, setRoomName] = useState('');

	const onChange = event => setRoomName(event.target.value);
	const onSubmit = event => {
		event.preventDefault();
		if (roomName.trim() !== '') {
			dispatch(createRoom(roomName));
			setRoomName('');
		}
	};

	return (
		<div className='new-room-form'>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					value={roomName}
					placeholder='Thêm phòng mới...'
					onChange={onChange}
					required
				/>
				<button id='create-room-btn' type='submit'>
					+
				</button>
			</form>
		</div>
	);
}

/* eslint-enable */
