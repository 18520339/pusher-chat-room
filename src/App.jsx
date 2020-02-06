/* jshint esversion: 9 */
/* eslint-disable */

import React, { useState } from 'react';
import { instanceId } from './server/config';

import LoginScreen from './components/LoginScreen';
import ChatScreen from './components/ChatScreen';

export default function App() {
	const [userName, setUserName] = useState('');
	const [currentScreen, setCurrentScreen] = useState('LoginScreen');

	const onSubmit = userName => {
		// const PORT = process.env.PORT || 3001;
		// const fetchUrl = `http://${window.location.hostname}:${PORT}/user`
		const fetchUrl = `https://us1.pusherplatform.io/services/chatkit/v6/${instanceId}/users`;
		const accessToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YW5jZSI6ImNhZjRhNTgzLTgxOTQtNDUxMC1hZGJlLWM5ODc5ZjA2MGZmYyIsImlzcyI6ImFwaV9rZXlzLzdlYTVlOTg2LTcyZmUtNGNlYy1iYTBjLTRkMDcyNTJmNWY1ZiIsImlhdCI6MTUwODc1MjcwOSwiZXhwIjoxNTA4ODM5MTA5LCJzdWIiOiJ0ZXN0Iiwic3UiOnRydWV9.GJ0eFwy1geqi8nK4iXeji85eURlJ9FkGRWVaVgngIK0';

		fetch(fetchUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authentication: `Bearer ${accessToken}`
			},
			body: JSON.stringify({ userName })
		})
			.then(res => {
				setUserName(userName);
				setCurrentScreen('ChatScreen');
			})
			.catch(err => {
				console.log(err);
				alert('Error on request server');
			});
	};

	if (currentScreen === 'LoginScreen')
		return <LoginScreen onSubmit={onSubmit} />;
	else if (currentScreen === 'ChatScreen')
		return <ChatScreen userName={userName} />;
}

/* eslint-enable */
