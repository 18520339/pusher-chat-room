/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function DropDown() {
	return (
		<div className='dropdown'>
			<button
				className='btn'
				data-toggle='dropdown'
				aria-haspopup='true'
				aria-expanded='false'
			>
				<i className='material-icons md-30'>more_vert</i>
			</button>
			<div className='dropdown-menu dropdown-menu-right'>
				<button className='dropdown-item connect'>
					<i className='material-icons'>phone_in_talk</i>
					Voice Call
				</button>
				<button className='dropdown-item connect'>
					<i className='material-icons'>videocam</i>
					Video Call
				</button>
				<hr />
				<button className='dropdown-item'>
					<i className='material-icons'>clear</i>
					Clear History
				</button>
				<button className='dropdown-item'>
					<i className='material-icons'>block</i>
					Block Contact
				</button>
				<button className='dropdown-item'>
					<i className='material-icons'>delete</i>
					Delete Contact
				</button>
			</div>
		</div>
	);
}

/* eslint-enable */
