const router = require('express').Router();
const passport = require('passport');
const userController = require('./controllers/userController');

router.post('/login', userController.login);

router.post(
	'/signup',
	passport.authenticate('signup', { session: false, failureFlash: false }),
	userController.signup
);

router.get(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	userController.profile
);

module.exports = router;
