/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RoomList() {
	const { rooms, roomActive } = useSelector(state => state);
	return (
		<div class='sidebar' id='sidebar'>
			<div class='container'>
				<div class='col-md-12'>
					<div class='tab-content'>
						<div id='discussions' class='tab-pane fade active show'>
							<SearchName />
							<SortGroup />
							<div class='discussions'>
								<h1>Các phòng chat</h1>
								<div id='chats' class='list-group' role='tablist' >
									{rooms.map(room => {
										const { id, name, unreadCount } = room;
										const isActive = roomActive.id === id ? ' active' : '';
										const avatar = name.replace(' ', '+');
										avatar = `https://ui-avatars.com/api/?name=${avatar}&size=200`;
										return (
											<Link
												key={id}
												id='list-chat-list'
												class={`filterDiscussions all unread single${isActive}`}
												to='#list-chat'
												data-toggle='list'
												role='tab'
											>
												<img
													class='avatar-md'
													src={avatar}
													data-toggle='tooltip'
													data-placement='top'
													title={name}
													alt='avatar'
												/>
												{unreadCount > 0 && (
													<div class='new bg-yellow'>
														<span>
															{unreadCount}
														</span>
													</div>
												)}
												<div class='data'>
													<h5>{name}</h5>
													<span>Mon</span>
													<p>
														A new feature has been
														updated to your account.
														Check it out...
													</p>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
