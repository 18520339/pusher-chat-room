/* jshint esversion: 9 */
/* eslint-disable */

import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import ChatScreen from './components/ChatScreen';

export default function App() {
	const [userName, setUserName] = useState('');
	const [currentScreen, setCurrentScreen] = useState('LoginScreen');

	const onSubmit = userName => {
		fetch(window.location.href + ':3001/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userName })
		})
			.then(res => {
				setUserName(userName);
				setCurrentScreen('ChatScreen');
			})
			.catch(err => alert('Error: ' + err.error));
	};

	if (currentScreen === 'LoginScreen')
		return <LoginScreen onSubmit={onSubmit} />;
	else if (currentScreen === 'ChatScreen')
		return <ChatScreen userName={userName} />;
}

/* eslint-enable */
