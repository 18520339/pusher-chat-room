/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { typingMessage, sendMessage } from '../../actions';

export default function SendMessage() {
	const { roomActive } = useSelector(state => state);
	const dispatch = useDispatch();

	const [message, setMessage] = useState('');

	const onChange = event => {
		setMessage(event.target.value);
		dispatch(typingMessage());
	};

	const onSubmit = event => {
		event.preventDefault();
		dispatch(sendMessage(message));
		setMessage('');
	};

	return (
		<form className='send-message-form' onSubmit={onSubmit}>
			<input
				type='text'
				value={message}
				placeholder='Nhập tin nhắn...'
				onChange={onChange}
				disabled={!roomActive.id}
			/>
		</form>
	);
}

/* eslint-enable */
