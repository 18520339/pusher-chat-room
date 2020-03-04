/* jshint esversion: 10 */
/* eslint-disable */

// server localhost
// const tokenUrl = 'http://localhost:3001/auth'; 

// server using API
const tokenUrl = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/caf4a583-8194-4510-adbe-c9879f060ffc/token';
const instanceLocator = 'v1:us1:caf4a583-8194-4510-adbe-c9879f060ffc';
const key = '7ea5e986-72fe-4cec-ba0c-4d07252f5f5f:LUB9fZZjg7vdpaFZlJEPBbZfKAe7sPLr/fhtA1+c3Co=';

const SWRTC_API_KEY = '970b4e5a23e7c4400327a45d';
const SWRTC_CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${SWRTC_API_KEY}`

export { tokenUrl, instanceLocator, key, SWRTC_CONFIG_URL };

/* eslint-enable */
