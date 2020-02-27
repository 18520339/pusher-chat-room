/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterRooms } from '../../actions';

export default function FilterRooms() {
	const { name, status } = useSelector(state => state.roomFilter);
	const dispatch = useDispatch();
	const onChange = event => {
		const roomName = event.target.value.toLowerCase().trim();
		dispatch(filterRooms(roomName));
	};
	return (
		<div id='room-filter'>
			<div className='search'>
				<form className='form-inline position-relative'>
					<input
						type='search'
						className='form-control'
						placeholder='Tìm kiếm phòng chat...'
						onChange={onChange}
					/>
					<button type='button' className='btn btn-link loop'>
						<i className='material-icons'>search</i>
					</button>
				</form>
			</div>
			<div className='list-group sort'>
				<button
					className={`btn ${status === 0 && 'active show'}`}
					onClick={() => dispatch(filterRooms(name, 0))}
				>
					Tất cả
				</button>
				<button
					className={`btn ${status === 1 && 'active show'}`}
					onClick={() => dispatch(filterRooms(name, 1))}
				>
					Đã đọc
				</button>
				<button
					className={`btn ${status === -1 && 'active show'}`}
					onClick={() => dispatch(filterRooms(name, -1))}
				>
					Chưa đọc
				</button>
			</div>
		</div>
	);
}

/* eslint-enable */
