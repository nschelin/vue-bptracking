const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: {
		type: mongoose.ObjectId,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		default: null,
	},
	lastName: {
		type: String,
		default: null,
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

userSchema.pre('save', async function (next) {
	const user = this;

	const hash = await bcrypt.hash(user.password, 10);
	user.password = hash;

	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;

	const compare = await bcrypt.compare(password, user.password);
	return compare;
};

const User = mongoose.model('User', userSchema, 'users');
module.exports = { User };
