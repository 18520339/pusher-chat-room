/* jshint esversion: 9 */
/* eslint-disable */

import { instanceLocator, secretKey } from './config';
import Chatkit from '@pusher/chatkit-server';
import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const chatkit = new Chatkit.default({ instanceLocator, key: secretKey });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/user', (req, res) => {
	const { userName } = req.body;
	chatkit
		.createUser({ id: userName, name: userName })
		.then(() => res.sendStatus(201))
		.catch(err => {
			if (err.error === 'services/chatkit/user_already_exists') {
				res.sendStatus(200);
			} else {
				res.status(err.statusCode).json(err);
			}
		});
});

app.post('/authenticate', (req, res) => {
	const authData = chatkit.authenticate({ userId: req.query.user_id });
	res.status(authData.status).send(authData.body);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = 3001;
app.listen(PORT, err => {
	if (err) console.error(err);
	else console.log(`Running on port ${PORT}`);
});

/* eslint-enable */
