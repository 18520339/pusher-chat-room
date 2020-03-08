/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { connect } from '../../actions';

import Navigation from '../Navigation';
import TopBar from '../TopBar';
import VideoChat from '../VideoChat';

import { RoomList, RoomStatus } from '../RoomList';
import UserList from '../UserList';
import MessageList from '../MessageList';
import { SendMessage } from '../FormControls';

export default function Chat({ match }) {
	const { authentication, rooms, isLoading, videoChat } = useSelector(
		state => state
	);
	const dispatch = useDispatch();
	const chatNode = useRef(null);

	const onShowRoomStatus = () => {
		if (isLoading) return <RoomStatus title='Đang kết nối máy chủ' />;
		else if (rooms.length > 0)
			return <RoomStatus title='Chọn phòng để bắt đầu chat nào !' />;
		return <RoomStatus title='Mời bạn tạo phòng chat mới !' />;
	};
	const onScroll = event => {
		// if (event.target.scrollTop === 0) alert('123');
	};

	useEffect(() => {
		dispatch(connect(authentication.userId));
	}, []);

	useEffect(() => {
		chatNode.current.scrollIntoView();
	}, [isLoading]);

	return (
		<div className='app'>
			<Navigation />
			<RoomList match={match} />
			<div className='main'>
				<div className='chat' ref={chatNode}>
					<TopBar />
					<div className='content' onScroll={onScroll}>
						<div className='container'>
							<Switch>
								<Route exact path={match.path}>
									{onShowRoomStatus()}
								</Route>
								{rooms.map(room => {
									if (!room) return;
									return (
										<Route
											key={room.id}
											path={`${match.path}/:roomId`}
											component={MessageList}
										/>
									);
								})}
								<Route>{onShowRoomStatus()}</Route>
							</Switch>
						</div>
					</div>
					<SendMessage />
				</div>
				{videoChat.show && <VideoChat />}
			</div>
			<UserList match={match} />
		</div>
	);
}

/* eslint-enable */
