var emailLabel = document.querySelector('#loginEmailLabel'), email = document.querySelector('#loginEmail'), mySVG = document.querySelector('.svgContainer'), //1
	eyeL = document.querySelector('.eyeL'), eyeR = document.querySelector('.eyeR'), eyeOuterL = document.querySelector('.eyeOuterL'), eyeOuterR = document.querySelector('.eyeOuterR'), nose = document.querySelector('.nose'), mouth = document.querySelector('.mouth'), //4
	chin = document.querySelector('.chin'), face = document.querySelector('.face'), eyebrow = document.querySelector('.eyebrow'), outerEarL = document.querySelector('.earL .outerEar'), outerEarR = document.querySelector('.earR .outerEar'), earHairL = document.querySelector('.earL .earHair'), earHairR = document.querySelector('.earR .earHair'), hair = document.querySelector('.hair');
var activeElement, curEmailIndex, screenCenter, svgCoords, emailCoords, emailScrollMax, chinMin = 0.5, dFromC, mouthStatus = 'small', blinking, eyeScale = 1;
var eyeLCoords, eyeRCoords, noseCoords, mouthCoords, eyeLAngle, eyeLX, eyeLY, eyeRAngle, eyeRX, eyeRY, noseAngle, noseX, noseY, mouthAngle, mouthX, mouthY, mouthR, chinX, chinY, chinS, faceX, faceY, faceSkew, eyebrowSkew, outerEarX, outerEarY, hairX, hairS;

function onEmailLabelClick(e) {
	activeElement = 'email';
}
function resetFace() {
	TweenMax.to([eyeL, eyeR], 1, {
		x: 0, y: 0, ease: Expo.easeOut
	});
	TweenMax.to(nose, 1, {
		x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut
	});
	TweenMax.to(mouth, 1, {
		x: 0, y: 0, rotation: 0, ease: Expo.easeOut
	});
	TweenMax.to(chin, 1, {
		x: 0, y: 0, scaleY: 1, ease: Expo.easeOut
	});
	TweenMax.to([face, eyebrow], 1, {
		x: 0, y: 0, skewX: 0, ease: Expo.easeOut
	});
	TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, {
		x: 0, y: 0, scaleY: 1, ease: Expo.easeOut
	});
}
function onEmailBlur(e) {
	activeElement = null;
	setTimeout(function () {
		if (activeElement == 'email') {
		} else {
			if (e.target.value == '') {
				e.target.parentElement.classList.remove('focusWithText');
			}
			//startBlinking();
			resetFace();
		}
	}, 100);
}
function getAngle(x1, y1, x2, y2) {
	var angle = Math.atan2(y1 - y2, x1 - x2);
	return angle;
}
function calculateFaceMove(e) {
	var carPos = email.selectionEnd, div = document.createElement('div'), span = document.createElement('span'), copyStyle = getComputedStyle(email), caretCoords = {};
	if (carPos == null || carPos == 0) {
		// if browser doesn't support 'selectionEnd' property on input[type="email"], use 'value.length' property instead
		carPos = email.value.length;
	}
	[].forEach.call(copyStyle, function (prop) {
		div.style[prop] = copyStyle[prop];
	});
	div.style.position = 'absolute';
	document.body.appendChild(div);
	div.textContent = email.value.substr(0, carPos);
	span.textContent = email.value.substr(carPos) || '.';
	div.appendChild(span);

	if (email.scrollWidth <= emailScrollMax) {
		caretCoords = getPosition(span);
		dFromC = screenCenter - (caretCoords.x + emailCoords.x);
		eyeLAngle = getAngle(
			eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 150
		);
		eyeRAngle = getAngle(
			eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 150
		);
		noseAngle = getAngle(
			noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25
		);
		mouthAngle = getAngle(
			mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25
		);
	} else {
		eyeLAngle = getAngle(
			eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 50
		);
		eyeRAngle = getAngle(
			eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 50
		);
		noseAngle = getAngle(
			noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25
		);
		mouthAngle = getAngle(
			mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25
		);
	}

	eyeLX = Math.cos(eyeLAngle) * 10;
	eyeLY = Math.sin(eyeLAngle) * 2;
	eyeRX = Math.cos(eyeRAngle) * 10;
	eyeRY = Math.sin(eyeRAngle) * 2;
	noseX = Math.cos(noseAngle) * 2;
	noseY = Math.sin(noseAngle) * 2;
	mouthX = Math.cos(mouthAngle) * 7;
	mouthY = Math.sin(mouthAngle) * 2;
	mouthR = Math.cos(mouthAngle) * 6;
	chinX = mouthX * 0.5;
	chinY = mouthY * 0.3;
	chinS = 1 - (dFromC * 0.1) / 100;
	if (chinS > 1) {
		chinS = 1 - (chinS - 1);
		if (chinS < chinMin) {
			chinS = chinMin;
		}
	}
	faceX = mouthX * 0.008;
	faceY = mouthY * 0.05;
	faceSkew = Math.cos(mouthAngle) * 2;
	eyebrowSkew = Math.cos(mouthAngle) * 50;
	outerEarX = Math.cos(mouthAngle) * 2;
	outerEarY = Math.cos(mouthAngle) * 3;
	hairX = Math.cos(mouthAngle) * 1;
	hairS = 1.1;

	TweenMax.to(eyeL, 1, {
		x: -eyeLX, y: -eyeLY, ease: Expo.easeOut
	});
	TweenMax.to(eyeR, 1, {
		x: -eyeRX, y: -eyeRY, ease: Expo.easeOut
	});
	TweenMax.to(nose, 1, {
		x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: 'center center', ease: Expo.easeOut
	});
	TweenMax.to(mouth, 1, {
		x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: 'center center', ease: Expo.easeOut
	});
	TweenMax.to(chin, 1, {
		x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut
	});
	TweenMax.to(face, 1, {
		x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: 'center top', ease: Expo.easeOut
	});
	TweenMax.to(eyebrow, 1, {
		x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: 'center top', ease: Expo.easeOut
	});
	TweenMax.to(outerEarL, 1, {
		x: outerEarX, y: -outerEarY, ease: Expo.easeOut
	});
	TweenMax.to(outerEarR, 1, {
		x: outerEarX, y: outerEarY, ease: Expo.easeOut
	});
	TweenMax.to(earHairL, 1, {
		x: -outerEarX, y: -outerEarY, ease: Expo.easeOut
	});
	TweenMax.to(earHairR, 1, {
		x: -outerEarX, y: outerEarY, ease: Expo.easeOut
	});
	TweenMax.to(hair, 1, {
		x: hairX, scaleY: hairS, transformOrigin: 'center bottom', ease: Expo.easeOut
	});

	document.body.removeChild(div);
}
function onEmailInput(e) {
	calculateFaceMove(e);
	var value = email.value;
	curEmailIndex = value.length;

	// very crude email validation to trigger effects
	if (curEmailIndex > 0) {
		if (mouthStatus == 'small') {
			mouthStatus = 'medium';
			TweenMax.to([eyeL, eyeR], 1, {
				scaleX: 0.85, scaleY: 0.85, ease: Expo.easeOut
			});
			eyeScale = 0.85;
		}
		if (value.includes('@')) {
			mouthStatus = 'large';
			TweenMax.to([eyeL, eyeR], 1, {
				scaleX: 0.65, scaleY: 0.65, ease: Expo.easeOut, transformOrigin: 'center center'
			});
			eyeScale = 0.65;
		} else {
			mouthStatus = 'medium';
			TweenMax.to([eyeL, eyeR], 1, {
				scaleX: 0.85, scaleY: 0.85, ease: Expo.easeOut
			});
			eyeScale = 0.85;
		}
	} else {
		mouthStatus = 'small';
		TweenMax.to([eyeL, eyeR], 1, {
			scaleX: 1, scaleY: 1, ease: Expo.easeOut
		});
		eyeScale = 1;
	}
}
function stopBlinking() {
	blinking.kill();
	blinking = null;
	TweenMax.set([eyeL, eyeR], {
		scaleY: eyeScale
	});
}
//onEmailFocus
function onEmailFocus(e) {
	activeElement = 'email';
	e.target.parentElement.classList.add('focusWithText');
	onEmailInput();
}
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
//startBlinking
function startBlinking(delay) {
	if (delay) {
		delay = getRandomInt(delay);
	} else {
		delay = 1;
	}

	blinking = TweenMax.to([eyeOuterL, eyeOuterR, eyeL, eyeR], 0.1, {
		delay: delay, scaleY: 0, yoyo: true, repeat: 1, transformOrigin: 'center center', onComplete: function () {
			startBlinking(12);
		}
	});
}
// getPosition
function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == 'BODY') {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += el.offsetLeft - xScroll + el.clientLeft;
			yPos += el.offsetTop - yScroll + el.clientTop;
		} else {
			// for all other non-BODY elements
			xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
			yPos += el.offsetTop - el.scrollTop + el.clientTop;
		}

		el = el.offsetParent;
	}
	//console.log("xPos: " + xPos + ", yPos: " + yPos);
	return {
		x: xPos, y: yPos
	};
}
function initLoginForm() {
	// some measurements for the svg's elements
	svgCoords = getPosition(mySVG);
	emailCoords = getPosition(email);
	screenCenter = svgCoords.x + mySVG.offsetWidth / 2;
	eyeLCoords = {
		x: svgCoords.x + 104, y: svgCoords.y + 287
	};
	eyeRCoords = {
		x: svgCoords.x + 104, y: svgCoords.y + 287
	};
	noseCoords = {
		x: svgCoords.x + 97, y: svgCoords.y + 81
	};
	mouthCoords = {
		x: svgCoords.x + 100, y: svgCoords.y + 100
	};

	// handle events for email input
	email.addEventListener('focus', onEmailFocus);

	email.addEventListener('blur', onEmailBlur);
	email.addEventListener('input', onEmailInput);
	emailLabel.addEventListener('click', onEmailLabelClick);

	// set initial mouth property (fixes positioning bug)
	TweenMax.set(mouth, {
		transformOrigin: 'center center'
	});

	// activate blinking
	startBlinking(5);
	// determine how far email input can go before scrolling occurs
	// will be used as the furthest point avatar will look to the right
	emailScrollMax = email.scrollWidth;
}
initLoginForm();
