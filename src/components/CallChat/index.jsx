import React from 'react';

export default function CallChat() {
	return (
		<div className='call' id='call1'>
			<div className='content'>
				<div className='container'>
					<div className='col-md-12'>
						<div className='inside'>
							<div className='panel'>
								<div className='participant'>
									<img
										className='avatar-xxl'
										src='img/avatars/avatar-female-5.jpg'
										alt='avatar'
									/>
									<span>Connecting</span>
								</div>
								<div className='options'>
									<button className='btn option'>
										<i className='material-icons md-30'>
											mic
										</i>
									</button>
									<button className='btn option'>
										<i className='material-icons md-30'>
											videocam
										</i>
									</button>
									<button className='btn option call-end'>
										<i className='material-icons md-30'>
											call_end
										</i>
									</button>
									<button className='btn option'>
										<i className='material-icons md-30'>
											person_add
										</i>
									</button>
									<button className='btn option'>
										<i className='material-icons md-30'>
											volume_up
										</i>
									</button>
								</div>
								<button className='btn back' name='1'>
									<i className='material-icons md-24'>chat</i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
