const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const WarningSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	maxDaysUntilEvent: {
		type: Number,
		required: true,
		min: 1,
		max: 14,
		set: value => Math.round(value)
	},
	minimunProbability: {
		type: Number,
		required: true,
		min: 5,
		max: 99,
		set: value => Math.round(value)
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
});

WarningSchema.plugin(mongoosePaginate);
mongoose.model('Warning', WarningSchema);
