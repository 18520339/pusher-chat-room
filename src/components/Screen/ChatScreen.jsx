/* jshint esversion: 10 */
/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from '../../actions';

import RoomList from '../RoomList';
import { MessageList, LoadingTitle } from '../MessageList';
import { UserList, TypingList } from '../Users';
import { CreateRoom, SendMessage } from '../FormControls';

export default function ChatScreen() {
	const { screen, rooms, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect(screen.userName));
	}, []);

	return (
		<BrowserRouter>
			<div className='app'>
				<RoomList />
				<UserList />
				<CreateRoom />
				<Switch>
					<Route exact path='/'>
						<ul className='message-list'>
							{isLoading ? (
								<LoadingTitle value='&ensp; Đang kết nối máy chủ ...' />
							) : (
								<LoadingTitle value='&larr; Chọn phòng để bắt đầu chat nào !' />
							)}
						</ul>
					</Route>
					{rooms.map(room => (
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
