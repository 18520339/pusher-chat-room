/* jshint esversion: 10 */
/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCarousel } from '../../actions';
import Content from './Content';

export default function Message({ parts, userType }) {
	const { currentUser, images } = useSelector(state => state);
	const dispatch = useDispatch();
	useEffect(() => {}, [images]);

	if (parts.length === 0) return;
	return parts.map((part, index) => {
		const { partType, payload } = part;

		if (partType === 'inline')
			return (
				<div key={index} className={`text ${userType}`}>
					<Content
						currentUserName={currentUser.name}
						text={payload.content}
					/>
				</div>
			);

		if (Date.now() > Date.parse(payload._expiration))
			payload._fetchNewDownloadURL();

		return (
			<img
				key={index}
				className={`w-25 img-thumbnail 
                    ${index !== parts.length - 1 && 'mb-3'}
                `}
				src={payload._downloadURL}
				alt='attachment'
				onClick={() => dispatch(toggleCarousel(index, 'MessageList'))}
			/>
		);
	});
}

/* eslint-enable */
