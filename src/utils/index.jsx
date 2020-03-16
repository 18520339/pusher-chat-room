/* jshint esversion: 10 */
/* eslint-disable */

export const alertError = (title, err) => {
	try {
		var error = err.error_description
			? err.error_description
			: err.info.error_description;
	} catch {
		error = err.error;
	}
	console.log(err);
	alert(title + ': ' + error);
};

export const onGetPrivateRoom = (room, currentUserId, isFilter) => {
	const { members } = room.customData;
	const users = Object.values(room.userStore.users);
	var mainUser = members[0];

	if (members.length === 2)
		mainUser = members.find(member => member.id !== currentUserId);

	const { id, avatarURL } = mainUser;
	var name = isFilter ? mainUser.name.toLowerCase() : mainUser.name;
	var status = isFilter ? -1 : '';

	mainUser = users.find(user => user.id === mainUser.id);
	if (mainUser) {
		name = mainUser.name;
		status = mainUser.presence.state;
		if (isFilter) status = mainUser.presence.state === 'online' ? 1 : -1;
	}

	return { id, name, status, avatarURL };
};

/* eslint-enable */
