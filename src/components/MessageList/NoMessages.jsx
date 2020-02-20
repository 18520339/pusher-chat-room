/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

export default function NoMessages(props) {
	const { isLoading } = useSelector(state => state);
	return (
		<div className='col-md-12'>
			<div className='no-messages'>
				{!isLoading && <i className='material-icons md-48'>forum</i>}
				<p>{props.title}</p>
				{isLoading && (
					<div className='wave'>
						<span className='dot'></span>&nbsp;
						<span className='dot'></span>&nbsp;
						<span className='dot'></span>
					</div>
				)}
			</div>
		</div>
	);
}

/* eslint-enable */
