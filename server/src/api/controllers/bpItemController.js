const { BpItem } = require('../../models');
const { getUser } = require('../utils');

exports.add = async (req, res) => {
	const {
		user: { _id },
	} = req;

	const { date, systolic, diastolic, bpm, notes } = req.body;

	const user = await getUser(_id);

	const bpItem = await BpItem.create({
		date,
		systolic,
		diastolic,
		bpm,
		notes,
		user,
	});

	if (!user.bpItems) {
		user.bpItems = [];
	}

	user.bpItems.push(bpItem);
	await user.save();

	res.json({
		message: 'Saved',
	});
};
