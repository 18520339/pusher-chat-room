/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function SortGroup(props) {
	return (
		<div className='list-group sort'>
			<button className='btn active show'>Tất cả</button>
			<button className='btn'>{props.groups[0]}</button>
			<button className='btn'>{props.groups[1]}</button>
		</div>
	);
}

/* eslint-enable */
