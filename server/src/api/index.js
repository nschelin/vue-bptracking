const router = require('express').Router();
const passport = require('passport');
const userController = require('./controllers/userController');

// router.post('/login', (req, res) => {
// 	const body = req.body;
// 	const { username, password } = body;

// 	if (username && password) {
// 		res.end(`Login Route: ${username}`);
// 	} else {
// 		res.end('No credentials provided');
// 	}
// });

router.post(
	'/signup',
	passport.authenticate('signup', { session: false, failureFlash: false }),
	userController.signup
);

module.exports = router;
