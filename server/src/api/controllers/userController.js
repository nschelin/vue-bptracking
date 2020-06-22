const passport = require('passport');

exports.signup = async (req, res) => {
	const { user } = req;
	res.json({
		message: 'Signup successful',
		user,
	});
};
