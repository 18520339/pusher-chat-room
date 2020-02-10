/* jshint esversion: 10 */
/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from '../actions';

import { RoomList, OnlineList } from '../components/SideBar';
import { MessageList, TypingList } from '../components/Messages';
import { CreateRoom, SendMessage } from '../components/FormControls';

export default function ChatScreen() {
	const { screenInfo, currentRooms, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect(screenInfo.userName));
	}, []);

	return (
		<BrowserRouter>
			<div className='app'>
				<RoomList />
				<OnlineList />
				<CreateRoom />
				<Switch>
					<Route exact path='/'>
						<ul className='message-list'>
							<li className='join-room'>
								{isLoading ? (
									<span>
										<i className='fas fa-spinner fa-pulse'></i>
										&ensp; Đang kết nối máy chủ ...
									</span>
								) : (
									<span>
										&larr; Chọn phòng để bắt đầu chat nào !
									</span>
								)}
							</li>
						</ul>
					</Route>
					{currentRooms.map(room => (
						<Route
							key={room.id}
							path='/:roomId'
							component={MessageList}
						/>
					))}
				</Switch>
				<TypingList />
				<SendMessage />
			</div>
		</BrowserRouter>
	);
}

/* eslint-enable */
