const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	modified: {
		type: Date,
		default: Date.now,
	},
	bpItems: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BpItem',
		},
	],
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = { User };
