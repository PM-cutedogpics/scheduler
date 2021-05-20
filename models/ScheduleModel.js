var mongoose = require("mongoose");

var SchedulesSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	schedName: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("Schedules", SchedulesSchema);
