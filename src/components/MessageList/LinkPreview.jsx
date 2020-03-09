/* jshint esversion: 10 */
/* eslint-disable */

import React from 'react';
import ReactPlayer from 'react-player';
import MicrolinkCard from '@microlink/react';

export default function LinkPreview({ urlMatches }) {
	const videoSignal = { youtube: 'watch?v=', facebook: 'videos' };
	return urlMatches.map((url, index) => {
		if (
			(url.includes('youtube') && url.includes(videoSignal.youtube)) ||
			(url.includes('facebook') && url.includes(videoSignal.facebook))
		)
			return (
				<ReactPlayer
					key={index}
					className='mt-2'
					url={url}
					width='100%'
					height='300px'
					controls
				/>
			);
		return <MicrolinkCard key={index} className='mt-2' url={url} />;
	});
}

/* eslint-enable */
