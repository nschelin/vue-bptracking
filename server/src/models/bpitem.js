const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bpItemSchema = new Schema(
	{
		date: Date,
		systolic: Number,
		diastolic: Number,
		bpm: Number,
		Notes: String,
	},
	{ collection: 'bloodpressure' }
);

const BpItem = mongoose.model('BpItem', bpItemSchema);
module.exports = { BpItem };
