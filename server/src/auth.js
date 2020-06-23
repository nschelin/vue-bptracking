const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('./models');

passport.use(
	'signup',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const foundUser = await User.findOne({ email });
				if (!foundUser) {
					const user = await User.create({ email, password });
					return done(null, user);
				} else {
					return done(null, false, { message: 'Email exists' });
				}
			} catch (error) {
				done(error);
			}
		}
	)
);
