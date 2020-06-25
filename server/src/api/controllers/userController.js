const passport = require('passport');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const expires = process.env.EXPIRES;
const { User } = require('../../models');

exports.profile = async (req, res) => {
	const {
		user: { _id },
	} = req;
	const user = await getUser(_id);

	if (user) {
		res.json({
			user,
			message: 'Profile found',
		});
	} else {
		res.json({
			message: 'Profile not found',
		});
	}
};

exports.update = async (req, res) => {
	const {
		user: { _id },
		body: { firstName, lastName },
	} = req;
	const user = await getUser(_id);

	user.firstName = firstName;
	user.lastName = lastName;
	await user.save();

	if (user) {
		res.json({
			user,
			message: 'Profile found',
		});
	} else {
		res.json({
			message: 'Profile not found',
		});
	}
};

exports.signup = async (req, res) => {
	const {
		user: { _id },
	} = req;
	const user = await getUser(_id);

	res.json({
		message: 'Signup successful',
		user,
	});
};

exports.login = async (req, res, next) => {
	passport.authenticate('login', async (err, user) => {
		try {
			if (err || !user) {
				const error = new Error('Error occurred');
				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, secret, { expiresIn: expires });

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

async function getUser(id) {
	return await User.findById(id, 'email firstName lastName created modified');
}
