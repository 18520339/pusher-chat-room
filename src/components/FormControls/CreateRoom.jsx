/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';

import { createRoom } from '../../actions';
import { alertError } from '../../functions';

export default function CreateRoom() {
	const chatkit = useSelector(state => state.chatkit);
	const dispatch = useDispatch();

	const [allUsers, setAllUsers] = useState([]);
	const [members, setMembers] = useState([]);
	const [roomInfo, setRoomInfo] = useState({ name: '', firstMessage: '' });

	const filterUserNames = token => {
		return allUsers.filter(user => user.name.includes(token));
	};

	const onChange = event => {
		const target = event.target;
		const { name, value } = target;
		setRoomInfo({ ...roomInfo, [name]: value });
	};

	const onAddMember = event => {
		const { value } = event.target;
		setMembers(members.filter(user => value.includes(user.name)));
	};

	const onSubmit = event => {
		event.preventDefault();
		const { name, members, firstMessage } = roomInfo.name;
		if (name.trim()) {
			dispatch(createRoom(name, members, firstMessage));
			setRoomName('');
		}
	};

	const onDisplayTags = () => {
		return members.map(user => {
			const { id, name, avatar_url } = user;
			return (
				<div key={id} className='user'>
					<img className='avatar-sm' src={avatar_url} alt='avatar' />
					<h5>{name}</h5>
					<button className='btn'>
						<i className='material-icons'>close</i>
					</button>
				</div>
			);
		});
	};

	useEffect(() => {
		chatkit
			.getUsers()
			.then(user => setAllUsers(user))
			.catch(err => alertError('Error on getting users', err));
	}, []);

	return (
		<div
			id='startnewchat'
			className='modal fade'
			tabIndex='-1'
			role='dialog'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered' role='document'>
				<div className='requests'>
					<div className='title'>
						<h1>Tạo phòng mới</h1>
						<button
							type='button'
							className='btn'
							data-dismiss='modal'
							aria-label='Close'
						>
							<i className='material-icons'>close</i>
						</button>
					</div>
					<div className='content'>
						<form onSubmit={onSubmit}>
							<div className='form-group'>
								<label htmlFor='participant'>Thành viên:</label>
								<ReactTextareaAutocomplete
									className='text-control'
									loadingComponent={() => <p>Loading...</p>}
									onChange={onAddMember}
									placeholder='Thêm thành viên...'
									trigger={{
										'@': {
											dataProvider: token => [
												...filterUserNames(token)
											],
											component: ({
												entity: { name }
											}) => <div>{name}</div>,
											output: item => {
												if (!members.includes(item))
													setMembers([
														...members,
														item
													]);
												return `${item.name},`;
											}
										}
									}}
								/>
								<div className='members'>{onDisplayTags()}</div>
							</div>
							<div className='form-group'>
								<label htmlFor='topic'>Tên phòng:</label>
								<input
									type='text'
									name='name'
									className='form-control'
									placeholder='Đặt tên phòng...'
									onChange={onChange}
									required
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='message'>Tin nhắn:</label>
								<textarea
									className='text-control'
									placeholder='Nhập tin nhắn đầu tiên của bạn...'
									onChange={onChange}
								></textarea>
							</div>
							<button type='submit' className='btn button w-100'>
								Tạo phòng mới
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
