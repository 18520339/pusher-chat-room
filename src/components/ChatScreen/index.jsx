/* jshint esversion: 9 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from '../../server/config';

import RoomList from '../RoomList';
import OnlineList from '../OnlineList';

import TypingList from '../TypingList';
import MessageList from '../MessageList';
import { CreateRoom, SendMessage } from '../Controls';

export default function ChatScreen(props) {
	const [currentUser, setCurrentUser] = useState({});
	const [usersTyping, setUsersTyping] = useState([]);

	const [roomActive, setRoomActive] = useState({});
	const [currentRooms, setCurrentRooms] = useState([]);

	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const chatManager = new ChatManager({
			instanceLocator,
			userId: props.userName,
			tokenProvider: new TokenProvider({ url: tokenUrl })
		});
		chatManager
			.connect()
			.then(currentUser => {
				setCurrentUser(currentUser);
				onGetRooms(currentUser);
				setIsLoading(false);
			})
			.catch(err => {
				try {
					var error = err.info.error_description;
				} catch {
					error = err.error;
				}
				console.log(err);
				alert('Error on connection: ' + error);
			});
	}, []);

	const onGetRooms = currentUser => {
		currentUser
			.getJoinableRooms()
			.then(unjoinedRooms => {
				setCurrentRooms([...currentUser.rooms, ...unjoinedRooms]);
			})
			.catch(err => {
				try {
					var error = err.info.error_description;
				} catch {
					error = err.error;
				}
				console.log(err);
				alert('Error on getting rooms: ' + error);
			});
	};

	const onEnterRoom = roomId => {
		setMessages([]);
		setIsLoading(true);

		currentUser
			.subscribeToRoom({
				roomId,
				messageLimit: 100,
				hooks: {
					onMessage: message => {
						setMessages(messages => [...messages, message]);
					},
					onUserStartedTyping: user => {
						setUsersTyping(usersTyping => [
							...usersTyping,
							user.name
						]);
					},
					onUserStoppedTyping: user => {
						setUsersTyping(usersTyping => {
							return usersTyping.filter(
								userName => userName !== user.name
							);
						});
					},
					onPresenceChange: () => this.forceUpdate(),
					onUserJoinedRoom: () => this.forceUpdate(),
					onUserLeftRoom: () => this.forceUpdate()
				}
			})
			.then(room => {
				setRoomActive(room);
				onGetRooms(currentUser);
				setIsLoading(false);
			})
			.catch(err => {
				try {
					var error = err.info.error_description;
				} catch {
					error = err.error;
				}
				console.log(err);
				alert('Error on entering rooms: ' + error);
			});
	};

	const onCreateRoom = name => {
		currentUser.createRoom({ name }).then(room => {
			onEnterRoom(room.id);
			history.pushState(null, null, room.id);
		});
	};

	const onTyping = () => {
		const roomId = roomActive.id;
		currentUser.isTypingIn({ roomId });
	};

	const onSendMessage = text => {
		const roomId = roomActive.id;
		currentUser.sendSimpleMessage({ roomId, text }).catch(err => {
			try {
				var error = err.info.error_description;
			} catch {
				error = err.error;
			}
			console.log(err);
			alert('Error on sending message: ' + error);
		});
	};

	return (
		<BrowserRouter>
			<div className='app'>
				<RoomList roomId={roomActive.id} currentRooms={currentRooms} />
				<OnlineList users={roomActive.users} />
				<CreateRoom onCreateRoom={onCreateRoom} />
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
					{currentRooms.map((room, index) => {
						return (
							<Route key={index} path={'/' + room.id}>
								<MessageList
									roomId={room.id}
									messages={messages}
									currentUser={currentUser}
									onEnterRoom={onEnterRoom}
									isLoading={isLoading}
								/>
							</Route>
						);
					})}
				</Switch>
				<TypingList usersTyping={usersTyping} />
				<SendMessage
					disabled={!roomActive.id}
					onTyping={onTyping}
					onSendMessage={onSendMessage}
				/>
			</div>
		</BrowserRouter>
	);
}

/* eslint-enable */
