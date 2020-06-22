const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bpItemSchema = new Schema({
	date: {
		type: Date,
		required: true,
	},
	systolic: {
		type: Number,
		required: true,
		min: 0,
	},
	diastolic: {
		type: Number,
		required: true,
		min: 0,
	},
	bpm: {
		type: Number,
		required: true,
		min: 0,
	},
	notes: String,
	created: {
		type: Date,
		default: Date.now,
	},
	modified: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const BpItem = mongoose.model('BpItem', bpItemSchema, 'bpmeasurements');
module.exports = { BpItem };
