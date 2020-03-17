/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signIn } from '../../actions';
import { Aside, AuthInput, ThirdParty } from '../Auth';

export default function SignIn() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });

	const onChange = event => {
		const target = event.target;
		const { name, value } = target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const onSubmit = event => {
		event.preventDefault();
		const { email, password } = userInfo;

		if (email.trim() && password.trim())
			dispatch(signIn(email, password, history));
	};

	return (
		<div className='app'>
			<div className='main sign-in'>
				<div className='start'>
					<div className='container'>
						<div className='col-md-12'>
							<div className='content'>
								<h1>Sign in QuanChat</h1>
								<ThirdParty />
								<p>Sử dụng tài khoản email đã đăng kí:</p>
								<form onSubmit={onSubmit}>
									<AuthInput
										type='email'
										id='inputEmail'
										value={userInfo.email}
										placeholder='email@domain.com'
										icon='mail_outline'
										onChange={onChange}
									/>
									<AuthInput
										type='password'
										id='inputPassword'
										value={userInfo.password}
										placeholder='Mật khẩu'
										icon='lock_outline'
										onChange={onChange}
									/>
									<button
										type='submit'
										className='btn button'
									>
										Đăng Nhập
									</button>
									<div className='callout'>
										<span>
											Chưa có tài khoản? &nbsp;
											<Link to='/sign-up'>Tạo ngay</Link>
										</span>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Aside
				to='/sign-up'
				title='Hello, Friend!'
				content='Nhập thông tin tài khoản và bắt đầu
						 hành trình với QuanChat ngay nào.'
			/>
		</div>
	);
}

/* eslint-enable */
