const { BpItem } = require('../../models');
const { getUser, getBpItem } = require('../utils');
const bpitem = require('../../models/bpitem');

exports.get = async (req, res) => {
	const { id: bpItemId } = req.params;
	const bpItem = await getBpItem(bpItemId);

	res.json({
		message: 'Retrieved',
		bpItem,
	});
};

exports.getAll = async (req, res) => {
	const {
		user: { _id },
	} = req;

	const perPage = 10;
	const user = await getUser(_id);
	const { bpItems } = user;

	const page = +req.params.page > 1 ? +req.params.page - 1 : 0;
	// page = page > 1 ? page - 1 : 0;

	const sortDir = req.query.sd || 'desc';
	const sortField = req.query.sf || 'modified';

	const sortedItems = [...bpItems].sort((a, b) => {
		switch (sortDir) {
			case 'desc':
				return a[sortField] - b[sortField];
			case 'asc':
				return b[sortField] - a[sortField];
		}
	});

	const start = page * perPage;
	const end = page * perPage + perPage;

	const pagedItems = sortedItems.slice(start, end);
	const totalPages = Math.ceil(pagedItems.length / perPage);
	const currentPage = page > 0 ? page + 1 : 1;

	res.json({
		message: 'Retrieved',
		bpItems: pagedItems,
		totalItems: bpItems.length,
		totalPages,
		currentPage,
	});
};

exports.getRecent = async (req, res) => {
	const {
		user: { _id },
	} = req;

	const defaultMax = 3;
	const max = +req.query.max || defaultMax;
	const user = await getUser(_id);
	const { bpItems } = user;

	const recentBpItems = bpItems.slice(0, max);

	res.json({
		message: 'Retrieved',
		bpItems: recentBpItems,
	});
};

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
		bpItem: await getBpItem(bpItem._id), // TODO: Refactor w/o call to db
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
