/* jshint esversion: 10 */
/* eslint-disable */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Card, Button } from 'react-bootstrap';

export default function ImageList() {
	const images = useSelector(state => state.images);
	const [rotate, setRotate] = useState(false);
	const onRotateIcon = () => setRotate(!rotate);
	return (
		<Accordion defaultActiveKey='0'>
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
							keyboard_arrow_down
						</i>
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey='0'>
					<Card.Body className='p-0'>
						{images.map((url, index) => (
							<a key={index} href={url} target='_blank'>
								<img className='img-thumbnail' src={url} />
							</a>
						))}
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}
