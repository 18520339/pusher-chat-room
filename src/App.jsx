/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';

import LoginScreen from './components/LoginScreen';
import ChatScreen from './components/ChatScreen';
import './scss/style.scss';

export default function App() {
	const { screenInfo } = useSelector(state => state);
	const { currentScreen } = screenInfo;

	if (currentScreen === 'LoginScreen') return <LoginScreen />;
	else if (currentScreen === 'ChatScreen') return <ChatScreen />;
}

/* eslint-enable */
