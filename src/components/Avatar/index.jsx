/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Avatar({ name, type, tooltip, size }) {
	const avatarSize = !size ? 'avatar-md' : `avatar-${size}`;
	var avatarAPI = 'https://avatars.dicebear.com/v2';

	if (type === 'room') {
		avatarAPI = `${avatarAPI}/jdenticon/${name}.svg`;
	} else if (type === 'user') {
		var options = { eyes: 'squint', eyebrow: 'raised', mouth: 'smile' };
		options = Object.keys(options).reduce((res, key) => {
			return `${res}options[${key}][]=${options[key]}&`;
		}, []);
		avatarAPI = `${avatarAPI}/avataaars/${name}.svg?${options}`;
	}

	return (
		<OverlayTrigger placement={tooltip} overlay={<Tooltip>{name}</Tooltip>}>
			<img className={avatarSize} src={avatarAPI} alt={name} />
		</OverlayTrigger>
	);
}

/* eslint-enable */
