var mongoose = require("mongoose");

var PostsSchema = new mongoose.Schema({
	// TODO: CHANGE TO REAL IMAGE
	postImg: {
		type: String,
		required: true,
	},
	// title
	schedTitle: {
		type: String,
		required: true,
	},
	// username
	schedAuthor: {
		type: String,
		required: true,
	},
	// description
	schedDesc: {
		type: String,
	},
	// set to 0
	upqty: {
		type: Number,
		required: true,
	},
	// set to 0
	downqty: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Posts", PostsSchema);
