// TODO: change contents of table

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", UserSchema);
