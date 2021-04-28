const mongoose = require("mongoose");
const User = require("./UserModel.js");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.DB_URL;
const options = { useUnifiedTopology: true, useNewUrlParser: true };

// TODO: edit and add stuff to db functions

const database = {
	connect: function () {
		mongoose.connect(url, options, (err) => {
			if (err) throw err;
			console.log("DB connected to: " + url);
		});
	},

	insertOne: function (model, doc, callback) {
		model.create(doc, function (error, result) {
			if (error) return callback(false);
			console.log("Added " + result);
			return callback(true);
		});
	},

	findOne: function (model, query, projection, callback) {
		model.findOne(query, projection, function (error, result) {
			if (error) return callback(false);
			return callback(result);
		});
	},
};
module.exports = database;
