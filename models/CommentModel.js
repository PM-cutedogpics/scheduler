var mongoose = require("mongoose");

var CommentsSchema = new mongoose.Schema({
	schedid: {
		type: String,
		required: true,
	},
	cAuthor: {
		type: String,
		required: true,
	},
	cDesc: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Comments", CommentsSchema);
