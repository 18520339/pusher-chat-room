/* jshint esversion: 10 */
/* eslint-disable */
'use strict';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Card, Button, Jumbotron } from 'react-bootstrap';

import { toggleCarousel } from '../../actions';
import ImageCarousel from './ImageCarousel';

export default function ImageList() {
	const { images, showCarousel } = useSelector(state => state);
	const dispatch = useDispatch();
	const [rotate, setRotate] = useState(false);

	const onRotateIcon = () => setRotate(!rotate);
	const onShowImages = () => {
		if (images.length === 0)
			return (
				<Jumbotron className='m-0 text-center'>
					<i className='material-icons display-4'>
						photo_size_select_actual
					</i>
					<p>Không có hình ảnh để hiển thị</p>
				</Jumbotron>
			);
		return images.map((url, index) => (
			<img
				key={index}
				className='img-thumbnail'
				src={url.src}
				alt='attachment'
				onClick={() => dispatch(toggleCarousel(index, 'ImageList'))}
			/>
		));
	};

	return (
		<Accordion>
			<Card>
				<Card.Header>
					<Accordion.Toggle
						as={Button}
						variant='default'
						eventKey='0'
						onClick={onRotateIcon}
					>
						Ảnh đã chia sẻ
						<i className={`material-icons ${rotate && 'rotate'}`}>
							keyboard_arrow_left
						</i>
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey='0'>
					<Card.Body className='p-0'>
						{onShowImages()}
						{showCarousel.where === 'ImageList' && (
							<ImageCarousel />
						)}
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

/* eslint-enable */
