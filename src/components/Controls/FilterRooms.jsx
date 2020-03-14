/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterRooms } from '../../actions';

export default function FilterRooms({ placeholder }) {
	const { name, status, isPrivate } = useSelector(state => state.roomFilter);
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');
	const onChange = event => {
		const roomName = event.target.value.toLowerCase().trim();
		setSearchText(event.target.value);
		dispatch(filterRooms(roomName, status, isPrivate));
	};

	useEffect(() => {
		setSearchText('');
	}, [isPrivate]);

	return (
		<div id='room-filter'>
			<div className='search'>
				<form className='form-inline position-relative'>
					<input
						type='search'
						className='form-control'
						placeholder={placeholder}
						onChange={onChange}
						value={searchText}
					/>
					<button type='button' className='btn btn-link loop'>
						<i className='material-icons'>search</i>
					</button>
				</form>
			</div>
			<div className='list-group sort'>
				<button
					className={`btn ${status === 0 && 'active show'}`}
					onClick={() => dispatch(filterRooms(name, 0, isPrivate))}
				>
					Tất cả
				</button>
				<button
					className={`btn ${status === 1 && 'active show'}`}
					onClick={() => dispatch(filterRooms(name, 1, isPrivate))}
				>
					{isPrivate ? 'Online' : 'Đã đọc'}
				</button>
				<button
					className={`btn ${status === -1 && 'active show'}`}
					onClick={() => dispatch(filterRooms(name, -1, isPrivate))}
				>
					{isPrivate ? 'Offline' : 'Chưa đọc'}
				</button>
			</div>
		</div>
	);
}

/* eslint-enable */
