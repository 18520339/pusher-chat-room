/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterRoom } from '../../actions';

import Message from './Message';
import MessageText from './MessageText';
import NoMessages from './NoMessages';

export default function MessageList({ match }) {
	const {
		currentUser,
		roomUsers,
		typingUsers,
		messages,
		isLoading
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
		if (document.hasFocus() && roomId)
			messageNode.current.scrollIntoView({ behavior: 'smooth' });
	}, [messages, typingUsers]);

	const onShowMessage = () => {
		if (messages.length === 0 && !isLoading && !roomNotFound)
			return <NoMessages title='Bắt đầu cuộc trò chuyện mới...' />;
		else if (isLoading) return <NoMessages title='Đang tải, đợi chút !' />;
		else if (!isLoading && roomNotFound)
			return <NoMessages title='404 Not Found :(' />;
		return messages.map(message => {
			const { id, sender, updatedAt, parts } = message;
			return (
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
							<a
								key={index}
								href={payload._downloadURL}
								target='_blank'
							>
								<img
									className={`w-25 rounded ${index !==
										parts.length - 1 && 'mb-3'}`}
									src={payload._downloadURL}
									alt='attachment'
								/>
							</a>
						);
					})}
				</Message>
			);
		});
	};

	const onShowTypingUsers = () => {
		return typingUsers.map(user => {
			const { id, name } = user;
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
			<div ref={messageNode} />
		</div>
	);
}

/* eslint-enable */
