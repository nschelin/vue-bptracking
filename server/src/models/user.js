const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
