/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import {
	typingMessage,
	sendMessage,
	sendNews,
	addEmoji,
	togglePicker
} from '../../actions';

import UploadImage from '../PopUp/UploadImage';
import TextArea from './TextArea';

export default function MessageInput() {
	const { roomActive, showPicker } = useSelector(state => state);
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');

	const onTogglePicker = () => dispatch(togglePicker());
	const onAddEmoji = emoji => setMessage(dispatch(addEmoji(emoji, message)));

	const handleSlashCommand = message => {
		const cmd = message.split(' ')[0];
		const query = message.slice(cmd.length).trim();

		if (cmd !== '/news') {
			alert(`Lệnh ${cmd} Không hợp lệ`);
			return;
		}
		dispatch(sendNews(query));
	};

	const onChange = text => {
		setMessage(text);
		dispatch(typingMessage());
	};

	const onSubmit = event => {
		event.preventDefault();
		const parts = [];

		if (message.trim()) {
			if (message.startsWith('/')) {
				handleSlashCommand(message);
				setMessage('');
				return;
			}
			parts.push({ type: 'text/plain', content: message });
			dispatch(sendMessage(parts));
			setMessage('');
		}
	};

	useEffect(() => {
		setMessage('');
	}, [roomActive]);

	return (
		<div className='container'>
			<div className='col-md-12'>
				<div className='bottom'>
					<form
						className='position-relative w-100'
						onSubmit={onSubmit}
					>
						<TextArea message={message} onChange={onChange} />
						<button
							type='button'
							className='btn emoticons'
							onClick={onTogglePicker}
							disabled={!roomActive.id}
						>
							<i className='material-icons'>insert_emoticon</i>
						</button>
						<button type='submit' className='btn send'>
							<i className='material-icons'>send</i>
						</button>
						{showPicker && (
							<Picker set='emojione' onSelect={onAddEmoji} />
						)}
					</form>
					<UploadImage />
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
