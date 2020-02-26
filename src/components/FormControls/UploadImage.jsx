/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from 'react-images-upload';
import { sendMessage } from '../../actions';
import Dialog from './Dialog';

export default function UploadImage() {
	const roomActive = useSelector(state => state.roomActive)
	const dispatch = useDispatch();

	const [pictures, setPictures] = useState([]);
	const [message, setMessage] = useState('');

	const onDrop = pictureFiles => setPictures(pictureFiles);
	const onChange = event => setMessage(event.target.value);

	const onSubmit = () => {
		if (pictures.length === 0) return;

		const parts = [];
		pictures.forEach(pic => parts.push({ file: pic }));

		if (message.trim())
			parts.push({ type: 'text/plain', content: message });

		dispatch(sendMessage(parts));
		setPictures([]);
		setMessage('');
	};

	return (
		<Dialog
			type='attach d-sm-block d-none'
			title='Thêm ảnh'
			icon='photo'
			onSubmit={onSubmit}
			disabled={!roomActive.id}
		>
			<div className='form-group'>
				<label>Tin nhắn:</label>
				<ImageUploader
					withIcon={true}
					withPreview={true}
					buttonText='Chọn ảnh từ máy'
					imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
					maxFileSize={5242880}
					onChange={onDrop}
				/>
			</div>
			<div className='form-group'>
				<label>Tin nhắn:</label>
				<input
					type='text'
					name='name'
					value={message}
					className='form-control'
					placeholder='Thêm tin nhắn về ảnh này...'
					onChange={onChange}
				/>
			</div>
		</Dialog>
	);
}

/* eslint-enable */
