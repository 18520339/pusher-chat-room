/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

export default function Aside({ to, title, content }) {
	return (
		<div className='aside'>
			<div className='container'>
				<div className='col-md-12'>
					<div className='preference'>
						<h2>{title}</h2>
						<p>{content}</p>
						<Link to={to} className='btn button'>
							{to === '/' ? 'Đăng nhập' : 'Đăng kí'}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-enable */
