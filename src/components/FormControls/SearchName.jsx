/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function SearchName(props) {
	return (
		<div className='search'>
			<form className='form-inline position-relative'>
				<input
					type='search'
					className='form-control'
					placeholder={props.placeholder}
				/>
				<button type='button' className='btn btn-link loop'>
					<i className='material-icons'>search</i>
				</button>
			</form>
		</div>
	);
}

/* eslint-enable */
