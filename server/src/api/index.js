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
