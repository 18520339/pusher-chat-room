/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React, { useRef, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { enterRoom } from '../../actions';
import { getDate } from '../../utils';

import Wrapper from './Wrapper';
import Message from './Message';

import { RoomStatus } from '../LeftSideBar';
import { ImageCarousel } from '../Images';

export default function MessageList({ match }) {
	const {
		currentUser,
		roomUsers,
		typingUsers,
		messages,
		isLoading,
		justLoadMore,
		showCarousel
	} = useSelector(state => state);
	const dispatch = useDispatch();

	const messageNode = useRef(null);
	let messageDate = 0;

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

	const onShowMessageDate = updatedAt => {
		const sendDate = new Date(updatedAt).setHours(0, 0, 0, 0);
		if (sendDate > messageDate) {
			messageDate = sendDate;
			return (
				<div className='date'>
					<hr />
					<span>{getDate(messageDate)}</span>
					<hr />
				</div>
			);
		}
	};

	const onShowMessage = () => {
		if (messages.length === 0 && !isLoading && !roomNotFound)
			return <RoomStatus title='Bắt đầu cuộc trò chuyện mới...' />;
		else if (isLoading) return <RoomStatus title='Đang tải, đợi chút !' />;
		else if (!isLoading && roomNotFound)
			return <RoomStatus title='404 Not Found :(' />;
		return messages.map(({ id, sender, updatedAt, parts }) => {
			const userType = sender.id === currentUser.id && 'me';
			return (
				<Fragment key={id}>
					{onShowMessageDate(updatedAt)}
					<Wrapper
						userType={userType}
						userName={sender.name}
						updatedAt={updatedAt}
						avatarURL={sender.avatarURL}
					>
						<Message parts={parts} userType={userType} />
					</Wrapper>
				</Fragment>
			);
		});
	};

	const onShowTypingUsers = () => {
		return typingUsers.map(user => {
			const { id, name, avatarURL } = user;
			if (currentUser.id === id) return;
			return (
				<Wrapper
					key={id}
					userType='text typing'
					userName={name}
					avatarURL={avatarURL}
				>
					<div className='wave'>
						<span className='dot'></span>&nbsp;
						<span className='dot'></span>&nbsp;
						<span className='dot'></span>
					</div>
				</Wrapper>
			);
		});
	};

	return (
		<Fragment>
			{onShowMessage()}
			{typingUsers.length > 0 && onShowTypingUsers()}
			{showCarousel.where === 'MessageList' && <ImageCarousel />}
			<div ref={messageNode} />
		</Fragment>
	);
}

/* eslint-enable */
