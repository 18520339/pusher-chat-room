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

export const getLastMessage = (name, message) => {
	const { type, content } = message;
	let lastMessage = '';

	if (type === 'text/plain')
		lastMessage = content.match(/\b(http|https)?:\/\/\S+/gi)
			? ' đã gửi 1 liên kết'
			: `: ${content}`;
	else if (type.includes('image')) lastMessage = ` đã gửi 1 ảnh`;
	return `${name}${lastMessage}`;
};

export const getPrivateRoom = (room, currentUserId, isFilter) => {
	const { members } = room.customData;
	const users = Object.values(room.userStore.users);
	var mainUser = members[0];

	if (members.length === 2)
		mainUser = members.find(mem => mem.id !== currentUserId);

	var { id, name, avatarURL } = mainUser;
	var status = isFilter ? -1 : '';

	mainUser = users.find(user => user.id === mainUser.id);
	if (mainUser) {
		var { id, name, presence, avatarURL } = mainUser;
		status = presence.state;
		if (isFilter) status = presence.state === 'online' ? 1 : -1;
	}

	return { id, name, status, avatarURL };
};

/* eslint-enable */
