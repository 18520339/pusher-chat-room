/* jshint esversion: 10 */
/* eslint-disable */

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { connect } from '../../actions';

import Navigation from '../Navigation';
import TopBar from '../TopBar';
import { CallByPeerJs, CallBySWRTC } from '../VideoChat';

import UserList from '../UserList';
import RoomList from '../RoomList';
import { MessageList, NoMessages } from '../MessageList';
import { SendMessage } from '../FormControls';

export default function Chat({ match }) {
	const { screen, rooms, isLoading, videoChat } = useSelector(state => state);
	const dispatch = useDispatch();
	const chatNode = useRef(null);

	useEffect(() => {
		dispatch(connect(screen.userId));
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
					<div className='content'>
						<div className='container'>
							<Switch>
								<Route exact path={match.path}>
									{isLoading ? (
										<NoMessages title='Đang kết nối máy chủ' />
									) : (
										<NoMessages title='Chọn phòng để bắt đầu chat nào!' />
									)}
								</Route>
								{rooms.map(room => {
									return (
										room.id && (
											<Route
												key={room.id}
												path={`${match.path}/:roomId`}
												component={MessageList}
											/>
										)
									);
								})}
							</Switch>
						</div>
					</div>
					<SendMessage />
				</div>
				{videoChat.show && <CallBySWRTC />}
			</div>
			<UserList match={match} />
		</div>
	);
}

/* eslint-enable */
