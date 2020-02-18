import React from 'react';

export default function Navigation() {
	return (
		<div class='navigation'>
			<div class='container'>
				<div class='inside'>
					<div class='nav nav-tab menu'>
						<button class='btn'>
							<img
								class='avatar-xl'
								src='img/avatars/avatar-male-1.jpg'
								alt='avatar'
							/>
						</button>
						<a
							href='#discussions'
							data-toggle='tab'
							class='active f-grow1'
						>
							<i class='material-icons active'>
								chat_bubble_outline
							</i>
						</a>
						<button class='btn mode'>
							<i class='material-icons'>brightness_2</i>
						</button>
						<button class='btn power' onclick='visitPage();'>
							<i class='material-icons'>power_settings_new</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
