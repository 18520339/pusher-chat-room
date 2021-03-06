/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React, { useState } from 'react';
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';

export default function Dialog(props) {
	const [modalShow, setModalShow] = useState(false);
	const { type, title, icon, disabled, children } = props;

	const onCloseModal = () => setModalShow(false);
	const onShowModal = () => {
		if (!disabled) setModalShow(true);
	};

	const onSubmit = event => {
		event.preventDefault();
		props.onSubmit();
		onCloseModal();
	};

	return (
		<ButtonToolbar>
			<Button
				className={type}
				variant='outline-primary'
				onClick={onShowModal}
			>
				<i className='material-icons'>{icon}</i>
			</Button>
			<Modal centered show={modalShow} onHide={onCloseModal}>
				<div className='requests'>
					<Modal.Header>
						<Modal.Title>
							<div className='title'>
								<h1>{title}</h1>
								<button
									type='button'
									className='btn'
									onClick={onCloseModal}
								>
									<i className='material-icons'>close</i>
								</button>
							</div>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className='content'>
							<form onSubmit={onSubmit}>
								{children}
								<button
									type='submit'
									className='btn button w-100'
								>
									{title}
								</button>
							</form>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</ButtonToolbar>
	);
}

/* eslint-enable */
