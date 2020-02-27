/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function AuthInput(props) {
	const { type, id, value, placeholder, icon } = props;
	const onChange = event => props.onChange(event);
	return (
		<div className='form-group'>
			<input
				type={type}
				name={type}
				id={id}
				className='form-control'
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				required
			/>
			<button className='btn icon'>
				<i className='material-icons'>{icon}</i>
			</button>
		</div>
	);
}

/* eslint-enable */
