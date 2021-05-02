var mongoose = require("mongoose");

var PostsSchema = new mongoose.Schema({
	schedcard: {
		type: String,
		required: true,
	},
	schedid: {
		type: String,
		required: true,
	},
	postImg: {
		type: String,
		required: true,
	},
	schedTitle: {
		type: String,
		required: true,
	},
	schedAuthor: {
		type: String,
		required: true,
	},
	schedDesc: {
		type: String,
	},
	upqty: {
		type: Number,
		required: true,
	},
	downqty: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Posts", PostsSchema);
