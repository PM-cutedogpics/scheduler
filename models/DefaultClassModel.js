var mongoose = require("mongoose");

var DefaultClassesSchema = new mongoose.Schema({
	className: {
		type: String,
		required: true,
	},
	classId: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("defaultclasses", DefaultClassesSchema);
