const passport = require('passport');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.signup = async (req, res) => {
	const { user } = req;
	res.json({
		message: 'Signup successful',
		user,
	});
};

exports.login = async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error('Error occurred');
				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, secret);

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};
