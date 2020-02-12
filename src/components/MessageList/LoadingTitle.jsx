/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function LoadingTitle(props) {
	const { isLoading } = useSelector(state => state);
	return (
		<li className='join-room'>
			{isLoading && <i className='fas fa-spinner fa-pulse'></i>}
			{props.value}
		</li>
	);
}

/* eslint-enable */
