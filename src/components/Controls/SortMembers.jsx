/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { sortMembers } from '../../actions';

export default function SortMembers() {
	const userSort = useSelector(state => state.userSort);
	const dispatch = useDispatch();

	const [title, setTitle] = useState('Sắp xếp theo');
	const { by, value } = userSort;

	return (
		<DropdownButton title={title} size='sm' variant='light'>
			<Dropdown.Item
				as='button'
				onClick={() => {
					setTitle('Đang Online');
					dispatch(sortMembers('status', 1));
				}}
			>
				Đang Online
				{by == 'status' && value == 1 && (
					<i className='material-icons ml-auto'>check</i>
				)}
			</Dropdown.Item>
			<Dropdown.Item
				as='button'
				onClick={() => {
					setTitle('Đang Offline');
					dispatch(sortMembers('status', -1));
				}}
			>
				Đang Offline
				{by == 'status' && value == -1 && (
					<i className='material-icons ml-auto'>check</i>
				)}
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item
				as='button'
				onClick={() => {
					setTitle('A đến Z');
					dispatch(sortMembers('name', 1));
				}}
			>
				A đến Z
				{by == 'name' && value == 1 && (
					<i className='material-icons ml-auto'>check</i>
				)}
			</Dropdown.Item>
			<Dropdown.Item
				as='button'
				onClick={() => {
					setTitle('Z đến A');
					dispatch(sortMembers('name', -1));
				}}
			>
				Z đến A
				{by == 'name' && value == -1 && (
					<i className='material-icons ml-auto'>check</i>
				)}
			</Dropdown.Item>
		</DropdownButton>
	);
}

/* eslint-enable */
