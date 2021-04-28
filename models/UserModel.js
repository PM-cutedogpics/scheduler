// TODO: change contents of table

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	fName: {
		type: String,
		required: true,
	},
	lName: {
		type: String,
		required: true,
	},
	idNum: {
		type: Number,
		required: true,
	},
	pw: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", UserSchema);
