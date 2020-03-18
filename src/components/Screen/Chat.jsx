/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Route, Switch } from 'react-router-dom';
import { connect, loadMoreMessages, grantPermission } from '../../actions';

import Navigation from '../Navigation';
import TopBar from '../TopBar';
import VideoCall from '../VideoCall';

import { LeftSideBar, RoomStatus } from '../LeftSideBar';
import RightSideBar from '../RightSideBar';

import MessageList from '../MessageList';
import SendMessage from '../SendMessage';

export default function Chat({ match }) {
	const {
		authentication,
		notification,
		isLoading,
		videoCall,
		rooms
	} = useSelector(state => state);
	const dispatch = useDispatch();
	const chatNode = useRef(null);

	const enablePermission = () => dispatch(grantPermission());
	const onShowRoomStatus = () => {
		const groupChat = rooms.filter(room => !room.isPrivate);
		if (isLoading) return <RoomStatus title='Đang kết nối máy chủ' />;
		else if (groupChat.length > 0)
			return <RoomStatus title='Chọn phòng để bắt đầu chat nào !' />;
		return <RoomStatus title='Mời bạn tạo phòng chat mới !' />;
	};
	const onScroll = event => {
		if (event.target.scrollTop === 0) dispatch(loadMoreMessages());
	};

	useEffect(() => {
		dispatch(connect(authentication.userId));
	}, []);

	useEffect(() => {
		chatNode.current.scrollIntoView();
	}, [isLoading]);

	return (
		<div className='app'>
			{notification && (
				<div className='notification-toast'>
					QuanChat cần bạn cho phép để&nbsp;
					<span onClick={enablePermission}>hiển thị thông báo</span>
				</div>
			)}
			<Navigation />
			<LeftSideBar match={match} />
			<div className='main'>
				<div className='chat' ref={chatNode}>
					<TopBar />
					<div className='content' onScroll={onScroll}>
						<div className='container'>
							<div className='col-md-12'>
								<Switch>
									<Route exact path={match.path}>
										{onShowRoomStatus()}
									</Route>
									{rooms.map(room => {
										if (!room) return;
										return (
											<Route
												key={room.id}
												exact
												path={`${match.path}/:roomId`}
												component={MessageList}
											/>
										);
									})}
									<Route>{onShowRoomStatus()}</Route>
								</Switch>
							</div>
						</div>
					</div>
					<SendMessage />
				</div>
				{videoCall.show && <VideoCall />}
			</div>
			<RightSideBar match={match} />
		</div>
	);
}

/* eslint-enable */
