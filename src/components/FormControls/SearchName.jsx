/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function SearchName() {
	return (
		<div class='search'>
			<form class='form-inline position-relative'>
				<input
					type='search'
					class='form-control'
					id='conversations'
					placeholder='Search for conversations...'
				/>
				<button type='button' class='btn btn-link loop'>
					<i class='material-icons'>search</i>
				</button>
			</form>
			<button
				class='btn create'
				data-toggle='modal'
				data-target='#startnewchat'
			>
				<i class='material-icons'>create</i>
			</button>
		</div>
	);
}

/* eslint-enable */