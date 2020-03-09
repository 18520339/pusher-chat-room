/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterRoom, toggleCarousel } from '../../actions';

import Message from './Message';
import MessageText from './MessageText';
import { RoomStatus } from '../RoomList';
import ImageCarousel from '../ImageCarousel';

export default function MessageList({ match }) {
	const {
		currentUser,
		roomUsers,
		typingUsers,
		messages,
		isLoading,
		justLoadMore
	} = useSelector(state => state);
	const dispatch = useDispatch();

	const messageNode = useRef(null);
	const { roomId } = match.params;
	const roomNotFound = !roomUsers.length;

	useEffect(() => {
		dispatch(enterRoom(roomId));
	}, [roomId]);

	useEffect(() => {
		messageNode.current.scrollIntoView();
	}, [isLoading]);

	useEffect(() => {
		if (document.hasFocus() && roomId && !justLoadMore)
			messageNode.current.scrollIntoView({ behavior: 'smooth' });
	}, [messages, typingUsers]);

	const onShowMessage = () => {
		if (messages.length === 0 && !isLoading && !roomNotFound)
			return <RoomStatus title='Bắt đầu cuộc trò chuyện mới...' />;
		else if (isLoading) return <RoomStatus title='Đang tải, đợi chút !' />;
		else if (!isLoading && roomNotFound)
			return <RoomStatus title='404 Not Found :(' />;
		return messages.map(({ id, sender, updatedAt, parts }) => (
			<Message
				key={id}
				userType={sender.id === currentUser.id && 'me'}
				userName={sender.name}
				updatedAt={updatedAt}
			>
				{parts.map((part, index) => {
					const { partType, payload } = part;

					if (partType === 'inline')
						return (
							<MessageText
								key={index}
								currentUserName={currentUser.name}
								text={payload.content}
							/>
						);

					if (Date.now() > Date.parse(payload._expiration))
						payload._fetchNewDownloadURL();

					return (
						<img
							key={index}
							className={`img-thumbnail ${index !==
								parts.length - 1 && 'mb-3'}`}
							src={payload._downloadURL}
							alt='attachment'
							onClick={() => dispatch(toggleCarousel(index))}
						/>
					);
				})}
			</Message>
		));
	};

	const onShowTypingUsers = () => {
		return typingUsers.map(user => {
			const { id, name } = user;
			if (currentUser.id === id) return;
			return (
				<Message key={id} userType='typing' userName={name}>
					<div className='wave'>
						<span className='dot'></span>&nbsp;
						<span className='dot'></span>&nbsp;
						<span className='dot'></span>
					</div>
				</Message>
			);
		});
	};

	return (
		<div className='col-md-12'>
			{onShowMessage()}
			{typingUsers.length > 0 && onShowTypingUsers()}
			<ImageCarousel />
			<div ref={messageNode} />
		</div>
	);
}

/* eslint-enable */
