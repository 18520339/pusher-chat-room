/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { SignIn, SignUp, Chat, NotFound } from '../Screen';
import '../../scss/style.scss';

export default function App() {
	const screen = useSelector(state => state.screen);
	const currentScreen = screen.currentScreen === 'SignIn' ? SignIn : Chat;
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from='/' to='/room' />
				<Route path='/room' component={currentScreen} />
				<Route path='/sign-up' component={SignUp} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

/* eslint-enable */
