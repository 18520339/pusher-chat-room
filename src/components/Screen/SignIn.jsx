/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthInput } from '../FormControls';
import { signIn } from '../../actions';

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
			<div className='main order-md-1'>
				<div className='start'>
					<div className='container'>
						<div className='col-md-12'>
							<div className='content'>
								<h1>Sign in QuanChat</h1>
								<div className='third-party'>
									<button className='btn item bg-blue'>
										<i className='material-icons'>pages</i>
									</button>
									<button className='btn item bg-teal'>
										<i className='material-icons'>
											party_mode
										</i>
									</button>
									<button className='btn item bg-purple'>
										<i className='material-icons'>
											whatshot
										</i>
									</button>
								</div>
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
			<div className='aside order-md-2'>
				<div className='container'>
					<div className='col-md-12'>
						<div className='preference'>
							<h2>Hello, Friend!</h2>
							<p>
								Nhập thông tin tài khoản và bắt đầu hành trình
								với QuanChat ngay nào.
							</p>
							<Link to='/sign-up' className='btn button'>
								Đăng kí
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
