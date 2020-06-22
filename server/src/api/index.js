const { model } = require('mongoose');

const router = require('express').Router();

router.post('/login', (req, res) => {
	const body = req.body;
	const { username, password } = body;

	if (username && password) {
		res.end(`Login Route: ${username}`);
	} else {
		res.end('No credentials provided');
	}
});

const router = require('express').Router();
const passport = require('passport');
const userController = require('./controllers/userController');

router.get('/', (req, res) => {
	res.end('Hello World!');
});

router.post(
	'/signup',
	passport.authenticate('signup', { session: false }),
	userController.signup
);

module.exports = router;
