/* jshint esversion: 9 */
/* eslint-disable */

// const tokenUrl = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/caf4a583-8194-4510-adbe-c9879f060ffc/token';
var tokenUrl = '';

try {
    const PORT = process.env.PORT || 3001;
    tokenUrl = `http://${window.location.hostname}:${PORT}/authenticate`;
} catch (error) { }

const instanceLocator = 'v1:us1:caf4a583-8194-4510-adbe-c9879f060ffc';
const secretKey = '7ea5e986-72fe-4cec-ba0c-4d07252f5f5f:LUB9fZZjg7vdpaFZlJEPBbZfKAe7sPLr/fhtA1+c3Co='

export { tokenUrl, instanceLocator, secretKey };

/* eslint-enable */
