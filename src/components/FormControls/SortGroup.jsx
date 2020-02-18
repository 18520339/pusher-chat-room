/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';

export default function SortGroup() {
	return (
		<div class='list-group sort'>
			<button
				class='btn filterDiscussionsBtn active show'
				data-toggle='list'
				data-filter='all'
			>
				All
			</button>
			<button
				class='btn filterDiscussionsBtn'
				data-toggle='list'
				data-filter='read'
			>
				Read
			</button>
			<button
				class='btn filterDiscussionsBtn'
				data-toggle='list'
				data-filter='unread'
			>
				Unread
			</button>
		</div>
	);
}

/* eslint-enable */