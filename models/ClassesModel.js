var mongoose = require("mongoose");

var ClassesSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	schedName: {
		type: String,
		required: true,
	},
	className: {
		type: String,
		required: true,
	},
	classId: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		required: true,
	},
	category: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("Class", ClassesSchema);