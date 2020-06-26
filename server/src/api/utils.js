const { User } = require('../models');
const getUser = async id => {
	return await User.findById(
		id,
		'email firstName lastName created modified'
	).populate('bpItems');
};

module.exports = { getUser };
