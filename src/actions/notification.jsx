/* jshint esversion: 10 */
/* eslint-disable */

import { SHOW_NOTIFICATION_TOAST } from '../constants';

export const grantPermission = () => (dispatch, getState) => {
	if (!('Notification' in window)) {
		alert('Trình duyệt của bạn không hỗ trợ hiển thị thông báo');
		return;
	}

	const { permission } = Notification;
	if (permission === 'granted') {
		new Notification('Bạn đã cho phép hiển thị thông báo rồi');
		dispatch({ type: SHOW_NOTIFICATION_TOAST, isShow: false });
		return;
	}

	if (permission !== 'denied' || permission === 'default') {
		Notification.requestPermission().then(result => {
			if (result === 'granted')
				new Notification('Tuyệt vời !!!', {
					body:
						'QuanChat sẽ bắt đầu thông báo cho bạn về tin nhắn mới nhất'
				});
		});
	}
	dispatch({ type: SHOW_NOTIFICATION_TOAST, isShow: false });
};

export const showNotificationToast = () => (dispatch, getState) => {
	if (window.Notification && Notification.permission === 'granted') return;
	dispatch({ type: SHOW_NOTIFICATION_TOAST, isShow: true });
};

export const showNotification = (title, lastMessage) => {
	return (dispatch, getState) => {
		new Notification(title, { body: lastMessage });
	};
};

/* eslint-enable */
