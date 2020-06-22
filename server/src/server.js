require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');

const msg = chalk.blueBright;
const err = chalk.red;

require('./auth');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require('./api');
app.use('/api', api);

app.use('/api', require('./api'));

const connectionString = process.env.CONNECTION_STRING || '';

if (connectionString) {
	const mongooseOpts = {
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	};

	mongoose
		.connect(connectionString, mongooseOpts)
		.then(res => console.log(msg('Connected to MongoDb')))
		.catch(error => console.log(err(error)));
	mongoose.Promise = global.Promise;
} else {
	console.log(err('Connection String'));
}

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(msg(`Server listening on PORT: ${PORT}`));
});
