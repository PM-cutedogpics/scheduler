var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	pTitle: {
		type: String,
		required: true,
	},
	pImg: {
		data: Buffer,
		contentType: String,
	},
	pAuthor: {
		type: Number,
		required: true,
	},
	pDesc: {
		type: String,
	},
	pLikes: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Post", PostSchema);
