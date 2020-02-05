/* jshint esversion: 9 */
/* eslint-disable */

import React, { useState } from 'react';

export default function SendMessage(props) {
	const { disabled, onTyping, onSendMessage } = props;
	const [message, setMessage] = useState('');

	const onChange = event => {
		setMessage(event.target.value);
		props.onTyping();
	};

	const onSubmit = event => {
		event.preventDefault();
		onSendMessage(message);
		setMessage('');
	};

	return (
		<form className='send-message-form' onSubmit={onSubmit}>
			<input
				type='text'
				value={message}
				placeholder='Nhập tin nhắn...'
				onChange={onChange}
				disabled={disabled}
			/>
		</form>
	);
}

/* eslint-enable */
