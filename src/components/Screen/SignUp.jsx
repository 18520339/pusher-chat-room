/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthInput } from '../FormControls';
import { signUp } from '../../actions';

export default function SignUp() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		password: ''
	});

	const onChange = event => {
		const target = event.target;
		const { name, value } = target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const onSubmit = event => {
		event.preventDefault();
		const { name, email, password } = userInfo;

		if (name.trim() && email.trim() && password.trim()) {
			dispatch(signUp(name, email, password));
			setUserInfo({ name: '', email: '', password: '' });
		}
	};

	return (
		<div className='app'>
			<div className='main order-md-2'>
				<div className='start'>
					<div className='container'>
						<div className='col-md-12'>
							<div className='content'>
								<h1>Tạo tài khoản</h1>
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
								<p>Sử dụng email của bạn để đăng kí:</p>
								<form className='signup' onSubmit={onSubmit}>
									<div className='form-parent'>
										<AuthInput
											type='name'
											id='inputName'
											value={userInfo.name}
											placeholder='Tên người dùng'
											icon='person_outline'
											onChange={onChange}
										/>
										<AuthInput
											type='email'
											id='inputEmail'
											value={userInfo.email}
											placeholder='Địa chỉ Email'
											icon='mail_outline'
											onChange={onChange}
										/>
									</div>
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
										Đăng kí
									</button>
									<div className='callout'>
										<span>
											Đã có tài khoản? &nbsp;
											<Link to='/'>Đăng Nhập</Link>
										</span>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='aside order-md-1'>
				<div className='container'>
					<div className='col-md-12'>
						<div className='preference'>
							<h2>Welcome Back!</h2>
							<p>
								Để giữ kết nối với bạn bè, vui lòng sử dụng
								thông tin tài khoản mà bạn đã đăng kí .
							</p>
							<Link to='/' className='btn button'>
								Đăng nhập
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
