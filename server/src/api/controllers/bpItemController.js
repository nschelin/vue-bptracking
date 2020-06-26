const { BpItem } = require('../../models');
const { getUser, getBpItem } = require('../utils');
const bpitem = require('../../models/bpitem');

exports.add = async (req, res) => {
	const {
		user: { _id },
	} = req;

	const { date, systolic, diastolic, bpm, notes, position } = req.body;

	const user = await getUser(_id);

	const bpItem = await BpItem.create({
		date,
		systolic,
		diastolic,
		bpm,
		notes,
		user,
		position,
	});

	if (!user.bpItems) {
		user.bpItems = [];
	}

	user.bpItems.push(bpItem);
	await user.save();

	res.json({
		message: 'Saved',
		bpItemId: bpItem._id,
	});
};

exports.update = async (req, res) => {
	const { id: bpItemId } = req.params;

	const { date, systolic, diastolic, bpm, notes, position } = req.body;

	const bpItem = await getBpItem(bpItemId);
	bpItem.date = date;
	bpItem.systolic = systolic;
	bpItem.diastolic = diastolic;
	bpItem.bpm = bpm;
	bpitem.notes = notes;
	bpItem.position = position;

	await bpItem.save();
	res.json({
		message: 'Updated',
		bpItemId: bpItem._id,
	});
};

exports.delete = async (req, res) => {
	const {
		user: { _id },
	} = req;

	const { id: bpItemId } = req.params;

	const user = await getUser(_id);

	const index = user.bpItems.findIndex(c => c._id === bpItemId);
	user.bpItems.splice(index, 1);
	await user.save();

	await BpItem.findByIdAndDelete(bpItemId);
	res.json({
		message: 'Deleted',
		bpItemId,
	});
};
