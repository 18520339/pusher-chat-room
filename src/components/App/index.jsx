/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SignIn, SignUp, Chat } from '../Screen';
import '../../scss/style.scss';

export default function App() {
	const { screen } = useSelector(state => state);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					{screen.currentScreen === 'SignIn' ? <SignIn /> : <Chat />}
				</Route>
				<Route path='/sign-up'>
					<SignUp />
				</Route>
				<Route path='/'>
					<h1>404 NOT FOUND</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

/* eslint-enable */
