/* jshint esversion: 10 */
/* eslint-disable */

export const alertError = (title, err) => {
	try {
		var error = err.info.error_description;
	} catch {
		error = err.error;
	}
	console.log(err);
	alert(title + error);
};

/* eslint-enable */
