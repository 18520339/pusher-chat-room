/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function SearchName() {
	return (
		<div className='search'>
			<form className='form-inline position-relative'>
				<input
					type='search'
					className='form-control'
					id='conversations'
					placeholder='Search for conversations...'
				/>
				<button type='button' className='btn btn-link loop'>
					<i className='material-icons'>search</i>
				</button>
			</form>
			<button
				className='btn create'
				data-toggle='modal'
				data-target='#startnewchat'
			>
				<i className='material-icons'>create</i>
			</button>
		</div>
	);
}

/* eslint-enable */