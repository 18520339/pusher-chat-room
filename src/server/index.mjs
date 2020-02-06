/* jshint esversion: 9 */
/* eslint-disable */

import { instanceLocator, secretKey } from './config';
import Chatkit from '@pusher/chatkit-server';
import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const chatkit = new Chatkit.default({ instanceLocator, key: secretKey });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
	const { userName } = req.body;

	chatkit
		.createUser({ id: userName, name: userName })
		.then(() => {
			console.log(`User created: ${userName}`);
			res.sendStatus(201);
		})
		.catch(err => {
			if (err.error === 'services/chatkit/user_already_exists') {
				console.log(`User already exists: ${userName}`);
				res.sendStatus(200);
			} else {
				res.status(err.statusCode).json(err);
			}
		});
});

app.post('/auth', (req, res) => {
	const authData = chatkit.authenticate({ userId: req.query.user_id });
	res.status(authData.status).send(authData.body);
});

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, err => {
// 	if (err) console.error(err);
// 	else console.log(`Running on port ${PORT}`);
// });

/* eslint-enable */
