/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Chat, SignIn, SignUp, NotFound } from '../Screen';

export default function App() {
	const { currentScreen } = useSelector(state => state.authentication);
	return (
		<HashRouter>
			<Switch>
				<Redirect exact from='/' to='/room' />
				<Route
					path='/room'
					component={currentScreen === 'SignIn' ? SignIn : Chat}
				/>
				<Route path='/sign-up' component={SignUp} />
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	);
}

/* eslint-enable */
