/* jshint esversion: 9 */
/* eslint-disable */

import React, { useState } from 'react';
import Chatkit from '@pusher/chatkit-server';
import { instanceLocator, key } from './server/config';

import LoginScreen from './components/LoginScreen';
import ChatScreen from './components/ChatScreen';

export default function App() {
	const [userName, setUserName] = useState('');
	const [currentScreen, setCurrentScreen] = useState('LoginScreen');

	/* Run server on localhost */
	// const onSubmitLocal = userName => {
	// 	fetch('http://localhost:3001/users', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ userName })
	// 	})
	// 		.then(res => {
	// 			setUserName(userName);
	// 			setCurrentScreen('ChatScreen');
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 			alert('Error on request server');
	// 		});
	// };

	/* Run server using API */
	const onSubmitAPI = async userName => {
		const chatkit = new Chatkit({ instanceLocator, key });
		await chatkit
			.createUser({ id: userName, name: userName })
			.then(() => console.log('User created successfully'))
			.catch(err => console.log(err));
		setUserName(userName);
		setCurrentScreen('ChatScreen');
	};

	if (currentScreen === 'LoginScreen')
		return <LoginScreen onSubmit={onSubmitAPI} />;
	else if (currentScreen === 'ChatScreen')
		return <ChatScreen userName={userName} />;
}

/* eslint-enable */
