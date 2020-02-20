/* jshint esversion: 10 */
/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { connect } from '../../actions';

import Navigation from '../Navigation';
import { RoomList } from '../RoomList';
import { TopBar } from '../TopBar';
import { MessageList, NoMessages } from '../MessageList';
import { UserList, TypingList } from '../Users';
import { CreateRoom, SendMessage } from '../FormControls';

export default function Chat({ match }) {
	const { screen, rooms, isLoading } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect(screen.userId));
	}, []);

	return (
		<div className='app'>
			<Navigation />
			<RoomList match={match} />
			<div className='main'>
				<div className='chat'>
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
								{rooms.map(room => (
									<Route
										key={room.id}
										path={`${match.path}/:roomId`}
										component={MessageList}
									/>
								))}
							</Switch>
						</div>
					</div>
					<SendMessage />
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
