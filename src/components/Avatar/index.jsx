/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AVATAR_API_URL, AVATAR_OPTIONS } from '../../api';

export default function Avatar({ name, type, tooltip = 'top', size }) {
	const avatarSize = !size ? 'avatar-md' : `avatar-${size}`;

	if (type === 'room')
		var avatarAPI = `${AVATAR_API_URL}/jdenticon/${name}.svg`;
	else if (type === 'user')
		var avatarAPI = `${AVATAR_API_URL}/avataaars/${name}.svg?${AVATAR_OPTIONS}`;

	return (
		<OverlayTrigger placement={tooltip} overlay={<Tooltip>{name}</Tooltip>}>
			<img className={avatarSize} src={avatarAPI} alt={name} />
		</OverlayTrigger>
	);
}

/* eslint-enable */
