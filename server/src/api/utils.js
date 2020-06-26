const { User, BpItem } = require('../models');
const getUser = async id => {
	return await User.findById(
		id,
		'email firstName lastName created modified'
	).populate('bpItems');
};

const getBpItem = async id => {
	return await BpItem.findById(
		id,
		'date systolic diastolic bpm notes position user'
	).populate('user');
};

module.exports = { getUser, getBpItem };
