var mongoose = require("mongoose");

var SchedulesSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	schedName: {
		type: String,
		required: true,
	},
	classes: [
		{
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
		}
	]
});

module.exports = mongoose.model("Schedules", SchedulesSchema);
