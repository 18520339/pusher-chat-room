/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	typingMessage,
	sendMessage,
	addEmoji,
	togglePicker
} from '../../actions';

import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default function SendMessage() {
	const { roomActive, showPicker } = useSelector(state => state);
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');

	const onAddEmoji = emoji => setMessage(dispatch(addEmoji(emoji, message)));
	const onTogglePicker = () => dispatch(togglePicker());

	const filterUserNames = token => {
		return roomActive.users.filter(user => user.name.includes(token));
	};

	const onChange = event => {
		setMessage(event.target.value);
		dispatch(typingMessage());
	};

	const onSubmit = event => {
		if (event.key === 'Enter' && message.trim() !== '') {
			dispatch(sendMessage(message));
			setMessage('');
		}
	};

	return (
		// <form className='send-message-form'>
		// 	<button
		// 		type='button'
		// 		className='toggle-emoji'
		// 		onClick={onTogglePicker}
		// 	>
		// 		<Smile />
		// 	</button>
		// 	<ReactTextareaAutocomplete
		// 		className='message-input'
		// 		value={message}
		// 		loadingComponent={() => <span>Loading...</span>}
		// 		onKeyUp={onSubmit}
		// 		onChange={onChange}
		// 		placeholder='Nhập tin nhắn...'
		// 		trigger={{
		// 			'@': {
		// 				dataProvider: token => [...filterUserNames(token)],
		// 				component: ({ entity: { name } }) => <div>{name}</div>,
		// 				output: item => `@${item.name}`
		// 			},
		// 			':': {
		// 				dataProvider: token =>
		// 					emojiIndex.search(token).map(o => ({
		// 						colons: o.colons,
		// 						native: o.native
		// 					})),
		// 				component: ({ entity: { native, colons } }) => (
		// 					<div>{`${colons} ${native}`}</div>
		// 				),
		// 				output: item => `${item.native}`
		// 			}
		// 		}}
		// 		disabled={!roomActive.id}
		// 	/>
		// 	{showPicker && <Picker set='emojione' onSelect={onAddEmoji} />}
		// </form>
		<div className='container'>
			<div className='col-md-12'>
				<div className='bottom'>
					<form className='position-relative w-100'>
						<textarea
							className='form-control'
							placeholder='Nhập tin nhắn...'
							onChange={onChange}
							rows='1'
						></textarea>
						<button
							type='button'
							className='btn emoticons'
							onClick={onTogglePicker}
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
					<label>
						<input type='file' />
						<span className='btn attach d-sm-block d-none'>
							<i className='material-icons'>attach_file</i>
						</span>
					</label>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
