/* jshint esversion: 9 */
/* eslint-disable */

import React, { useState } from 'react';

export default function NewRoom(props) {
	const [roomName, setRoomName] = useState('');

	const onChange = event => setRoomName(event.target.value);
	const onSubmit = event => {
		event.preventDefault();
		props.onCreateRoom(roomName);
		setRoomName('');
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
