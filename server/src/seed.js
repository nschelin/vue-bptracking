// test data
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const connectionString = process.env.CONNECTION_STRING;

if (connectionString) {
	const mongooseOpts = {
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	};

	mongoose
		.connect(connectionString, mongooseOpts)
		.then((res) => console.log(msg('Connected to MongoDb')))
		.catch((error) => console.log(err(error)));
	mongoose.Promise = global.Promise;
} else {
	console.log(err('Connection String'));
}
