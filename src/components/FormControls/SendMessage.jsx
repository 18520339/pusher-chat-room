/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { Picker, emojiIndex } from 'emoji-mart';
import {
	typingMessage,
	sendMessage,
	sendNews,
	addEmoji,
	togglePicker
} from '../../actions';

import UploadImage from './UploadImage';
import 'emoji-mart/css/emoji-mart.css';

export default function SendMessage() {
	const { roomActive, showPicker } = useSelector(state => state);
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');

	const onTogglePicker = () => dispatch(togglePicker());
	const onAddEmoji = emoji => setMessage(dispatch(addEmoji(emoji, message)));

	const filterUserNames = token => {
		return roomActive.users.filter(user => user.name.includes(token));
	};
	const handleSlashCommand = message => {
		const cmd = message.split(' ')[0];
		const query = message.slice(cmd.length).trim();

		if (cmd !== '/news') {
			alert(`Lệnh ${cmd} Không hợp lệ`);
			return;
		}
		dispatch(sendNews(query));
	};

	const onChange = event => {
		setMessage(event.target.value);
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

	return (
		<div className='container'>
			<div className='col-md-12'>
				<div className='bottom'>
					<form
						className='position-relative w-100'
						onSubmit={onSubmit}
					>
						<ReactTextareaAutocomplete
							className='form-control'
							value={message}
							loadingComponent={() => <p>Loading...</p>}
							onChange={onChange}
							placeholder='Nhập tin nhắn...'
							trigger={{
								'@': {
									dataProvider: token => [
										...filterUserNames(token)
									],
									component: ({ entity: { name } }) => (
										<div>{name}</div>
									),
									output: item => `@${item.name}`
								},
								':': {
									dataProvider: token =>
										emojiIndex.search(token).map(o => ({
											colons: o.colons,
											native: o.native
										})),
									component: ({
										entity: { native, colons }
									}) => <div>{`${colons} ${native}`}</div>,
									output: item => `${item.native}`
								}
							}}
							disabled={!roomActive.id}
						/>

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
