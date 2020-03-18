/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Chat, SignIn, SignUp, NotFound } from '../Screen';

export default function App() {
	const { currentScreen } = useSelector(state => state.authentication);
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from='/' to='/room' />
				<Route
					path='/room'
					component={currentScreen === 'SignIn' ? SignIn : Chat}
				/>
				<Route path='/sign-up' component={SignUp} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

/* eslint-enable */
