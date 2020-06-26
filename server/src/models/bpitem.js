const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bpItemSchema = new Schema(
	{
		_id: {
			type: mongoose.ObjectId,
			auto: true,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
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
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	// Mongoose handles the timestamps (renamed)
	{
		timestamps: {
			createdAt: 'created',
			updatedAt: 'modified',
		},
	}
);

const BpItem = mongoose.model('BpItem', bpItemSchema, 'bpmeasurements');
module.exports = { BpItem };
