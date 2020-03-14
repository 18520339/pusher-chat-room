/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { emojiIndex } from 'emoji-mart';

export default function TextArea(props) {
	const { id, users } = useSelector(state => state.roomActive);
	const onChange = event => props.onChange(event.target.value);
	const filterUserNames = token => {
		return users.filter(user => user.name.includes(token));
	};
	return (
		<ReactTextareaAutocomplete
			className='form-control'
			value={props.message}
			loadingComponent={() => <p>Loading...</p>}
			onChange={onChange}
			placeholder='Nhập tin nhắn. Gõ @ để đề cập ai đó'
			trigger={{
				'@': {
					dataProvider: token => [...filterUserNames(token)],
					component: ({ entity: { name } }) => <div>{name}</div>,
					output: item => `@${item.name}`
				},
				':': {
					dataProvider: token =>
						emojiIndex.search(token).map(o => ({
							colons: o.colons,
							native: o.native
						})),
					component: ({ entity: { native, colons } }) => (
						<div>{`${colons} ${native}`}</div>
					),
					output: item => `${item.native}`
				}
			}}
			disabled={!id}
		/>
	);
}

/* eslint-enable */
