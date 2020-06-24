// much learned from:
// https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local').Strategy;
const { User } = require('./models');
const secret = process.env.SECRET;

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

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email });

				if (!user) {
					return done(null, false, { message: 'User not found' });
				}

				const validate = await user.isValidPassword(password);
				if (!validate)
					return done(null, false, { message: 'Wrong Password' });

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				console.log(error);
				done(error);
			}
		}
	)
);

passport.use(
	new jwtStrategy(
		{
			secretOrKey: secret,
			jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
		}
	)
);
