/* jshint esversion: 10 */
/* eslint-disable */

import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

const copyStyles = (sourceDoc, targetDoc) => {
	Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
		try {
			if (styleSheet.cssRules) {
				const newStyleEl = sourceDoc.createElement('style');
				Array.from(styleSheet.cssRules).forEach(cssRule => {
					newStyleEl.appendChild(
						sourceDoc.createTextNode(cssRule.cssText)
					);
				});
				targetDoc.head.appendChild(newStyleEl);
			} else {
				const newLinkEl = sourceDoc.createElement('link');
				newLinkEl.rel = 'stylesheet';
				newLinkEl.href = styleSheet.href;
				targetDoc.head.appendChild(newLinkEl);
			}
		} catch (e) {
			console.log(e);
		}
	});
};

export default class NewWindow extends PureComponent {
	constructor(props) {
		super(props);
		this.containerEl = document.createElement('main');
		this.externalWindow = null;
	}

	componentDidMount() {
		this.externalWindow = window.open('', '', 'width=600,height=640');
		copyStyles(window.document, this.externalWindow.document);

		this.externalWindow.document.title = this.props.title;
		this.externalWindow.document.body.appendChild(this.containerEl);
	}

	componentWillUnmount() {
		this.externalWindow.close();
	}

	render() {
		return createPortal(this.props.children, this.containerEl);
	}
}

/* eslint-enable */
