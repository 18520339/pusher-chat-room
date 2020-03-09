/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { toggleCarousel } from '../../actions';

export default function ImageCarousel() {
	const { images, showCarousel } = useSelector(state => state);
	const dispatch = useDispatch();
	const toggleModal = () => dispatch(toggleCarousel());

	return (
		<ModalGateway>
			<Modal onClose={toggleModal}>
				<Carousel
					currentIndex={showCarousel.imageIndex}
					views={images}
				/>
			</Modal>
		</ModalGateway>
	);
}

/* eslint-enable */
