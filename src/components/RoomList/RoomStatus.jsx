/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

export default function RoomStatus({ title }) {
	const { isLoading } = useSelector(state => state);
	return (
		<div className='col-md-12'>
			<div className='no-messages'>
				{!isLoading && <i className='material-icons md-48'>forum</i>}
				<p>{title}</p>
				{isLoading && <Spinner animation='border' variant='primary' />}
			</div>
		</div>
	);
}

/* eslint-enable */
