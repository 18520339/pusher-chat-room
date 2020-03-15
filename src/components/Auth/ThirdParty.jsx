/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import { FACEBOOK_APP_ID, GITHUB_APP_ID, GOOGLE_APP_ID } from '../../config';

export default function ThirdParty() {
	const responseFacebook = response => console.log(response);
	const responseGoogle = response => console.log(response);
	const responseGitHub = response => console.log(response);
	return (
		<div className='third-party'>
			<FacebookLogin
				appId={FACEBOOK_APP_ID}
				callback={responseFacebook}
				render={renderProps => (
					<button className='btn item' onClick={renderProps.onClick}>
						<img src='https://img.icons8.com/color/96/000000/facebook-new.png' />
					</button>
				)}
			/>
			<GoogleLogin
				clientId={GOOGLE_APP_ID}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				render={renderProps => (
					<button className='btn item' onClick={renderProps.onClick}>
						<img src='https://img.icons8.com/color/96/000000/google-logo.png' />
					</button>
				)}
			/>
			<GitHubLogin
				clientId={GITHUB_APP_ID}
				className='btn item'
				redirectUri=''
				onSuccess={responseGitHub}
				onFailure={responseGitHub}
			>
				<img src='https://img.icons8.com/material-sharp/96/000000/github.png' />
			</GitHubLogin>
		</div>
	);
}

/* eslint-enable */
