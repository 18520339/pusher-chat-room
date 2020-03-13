/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterRoom } from '../../actions';

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
	var messageDay = 0;

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

	const onShowMessageDay = updatedAt => {
		const sendDay = new Date(updatedAt).setHours(0, 0, 0, 0);
		if (sendDay > messageDay) {
			messageDay = sendDay;
			return (
				<div className='date'>
					<hr />
					<span>
						{messageDay === new Date().setHours(0, 0, 0, 0)
							? 'Hôm nay'
							: new Date(updatedAt).toLocaleDateString('vi-VN', {
									weekday: 'narrow',
									year: 'numeric',
									month: '2-digit',
									day: '2-digit'
							  })}
					</span>
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
				<div key={id}>
					{onShowMessageDay(updatedAt)}
					<Wrapper
						userType={userType}
						userName={sender.name}
						updatedAt={updatedAt}
					>
						<Message parts={parts} userType={userType} />
					</Wrapper>
				</div>
			);
		});
	};

	const onShowTypingUsers = () => {
		return typingUsers.map(user => {
			const { id, name } = user;
			if (currentUser.id === id) return;
			return (
				<Wrapper key={id} userType='text typing' userName={name}>
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
		<div className='col-md-12'>
			{onShowMessage()}
			{typingUsers.length > 0 && onShowTypingUsers()}
			{showCarousel.where === 'MessageList' && <ImageCarousel />}
			<div ref={messageNode} />
		</div>
	);
}

/* eslint-enable */
