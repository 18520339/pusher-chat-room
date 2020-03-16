/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';

import { GITHUB_REDIRECT_API, GITHUB_ACCESS_API } from '../../api';
import {
	FACEBOOK_APP_ID,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID
} from '../../config';

import { alertError } from '../../utils';
import { signUp } from '../../actions';

export default function ThirdParty() {
	const dispatch = useDispatch();

	const onFailureGoogle = err => {
		alertError('Error on signing in Google', err);
	};

	const onFailureGitHub = err => {
		alertError('Error on signing in Google', err);
	};

	const onCallBackFacebook = result => {
		const { id, name, email, picture } = result;
		dispatch(signUp(name, email, id, picture.data.url, true));
	};

	const onSuccessGoogle = result => {
		const { googleId, givenName, email, imageUrl } = result.profileObj;
		dispatch(signUp(givenName, email, googleId, imageUrl, true));
	};

	const onSuccesGitHub = result => {
		axios
			.post(GITHUB_REDIRECT_API, {
				client_id: GITHUB_CLIENT_ID,
				client_secret: GITHUB_CLIENT_SECRET,
				code: result.code
			})
			.then(res => {
				const access_token = res.data
					.split('&')[0]
					.replace('access_token=', '');
				return axios.get(GITHUB_ACCESS_API, {
					headers: { Authorization: `token ${access_token}` }
				});
			})
			.then(res => {
				const { id, name, email, avatar_url } = res.data;
				dispatch(signUp(name, email, id, avatar_url, true));
			})
			.catch(err => onFailureGitHub(err));
	};

	return (
		<div className='third-party'>
			<FacebookLogin
				appId={FACEBOOK_APP_ID}
				fields='name,email,picture'
				callback={onCallBackFacebook}
				render={renderProps => (
					<button className='btn item' onClick={renderProps.onClick}>
						<img src='https://img.icons8.com/color/96/000000/facebook-new.png' />
					</button>
				)}
			/>
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				onSuccess={onSuccessGoogle}
				onFailure={onFailureGoogle}
				render={renderProps => (
					<button className='btn item' onClick={renderProps.onClick}>
						<img src='https://img.icons8.com/color/96/000000/google-logo.png' />
					</button>
				)}
			/>
			<GitHubLogin
				clientId={GITHUB_CLIENT_ID}
				className='btn item'
				redirectUri=''
				onSuccess={onSuccesGitHub}
				onFailure={onFailureGitHub}
			>
				<img src='https://img.icons8.com/material-sharp/96/000000/github.png' />
			</GitHubLogin>
		</div>
	);
}

/* eslint-enable */
