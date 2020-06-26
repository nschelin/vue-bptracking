const router = require('express').Router();
const passport = require('passport');
const userController = require('./controllers/userController');
const bpItemController = require('./controllers/bpItemController');

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

router.put(
	'/update',
	passport.authenticate('jwt', { session: false }),
	userController.update
);

router.post(
	'/bpitem/add',
	passport.authenticate('jwt', { session: false }),
	bpItemController.add
);

module.exports = router;
