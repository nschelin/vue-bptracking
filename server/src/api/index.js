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

module.exports = router;
