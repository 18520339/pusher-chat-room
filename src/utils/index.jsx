/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

export const alertError = (title, err) => {
	let error = err;
	try {
		error = err.error_description
			? err.error_description
			: err.info.error_description;
	} catch {
		error = err.error ? err.error : err;
	}
	console.log(err);
	alert(`${title}: ${error}`);
};

export const getDate = dateTime => {
	const today = new Date().setHours(0, 0, 0, 0);
	switch (dateTime) {
		case today:
			return 'Hôm nay';
		case today - 86400000:
			return 'Hôm qua';
		default:
			return new Date(dateTime).toLocaleDateString('vi-Vn', {
				weekday: 'narrow',
				year: '2-digit',
				month: '2-digit',
				day: '2-digit'
			});
	}
};

export const getLastMessage = (name, parts) => {
	const { partType, payload } = parts[parts.length - 1];
	let lastMessage = `: ${payload.content}`;

	if (partType === 'attachment') lastMessage = ' đã gửi 1 ảnh';
	else if (partType === 'url') lastMessage = ' đã gửi 1 liên kết';
	return `${name}${lastMessage}`;
};

export const getPrivateRoom = (room, currentUserId, isFilter) => {
	const { members } = room.customData;
	const users = Object.values(room.userStore.users);
	let mainUser = members[0];

	if (members.length === 2)
		mainUser = members.find(member => member.id !== currentUserId);

	const { id, avatarURL } = mainUser;
	let name = isFilter ? mainUser.name.toLowerCase() : mainUser.name;
	let status = isFilter ? -1 : '';

	mainUser = users.find(user => user.id === mainUser.id);
	if (mainUser) {
		name = mainUser.name;
		status = mainUser.presence.state;
		if (isFilter) status = mainUser.presence.state === 'online' ? 1 : -1;
	}

	return { id, name, status, avatarURL };
};

/* eslint-enable */
