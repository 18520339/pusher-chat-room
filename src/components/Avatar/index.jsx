/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AVATAR_API_URL, AVATAR_OPTIONS } from '../../api';

export default function Avatar({ name, type, tooltip = 'top', src, size }) {
	const avatarSize = !size ? 'avatar-md' : `avatar-${size}`;

	if (!src) {
		if (type === 'room') src = `${AVATAR_API_URL}/jdenticon/${name}.svg`;
		else if (type === 'user')
			src = `${AVATAR_API_URL}/avataaars/${name}.svg?${AVATAR_OPTIONS}`;
	}

	return (
		<OverlayTrigger placement={tooltip} overlay={<Tooltip>{name}</Tooltip>}>
			<img className={avatarSize} src={src} alt={name} />
		</OverlayTrigger>
	);
}

/* eslint-enable */
