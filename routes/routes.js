const express = require("express");
const db = require("../models/db");
const User = require("../models/UserModel.js");
const Post = require("../models/PostModel.js");
const app = express();

// TODO: add in routes
//insert routes here
// app.get() ...

app.get("/home", (req, res) => {
	var posts = [];
	for (var i = 0; i < 5; i++) {
		var post = {
			schedcard: "schedcard-" + (i + 1),
			schedid: "A1B2" + (i + 1),
			postImg: "/img/example" + (i + 1) + ".jpg",
		};
		posts.push(post);
		console.log(posts[i].schedcard);
		console.log(posts[i].postImg);
	}
	console.log(posts.length);
	res.render("home", posts);
});

app.get("/viewpost/:postid", (req, res) => {
	var query = { postid: req.params.posid };
	var post = {
		schedcard: "schedcard-1",
		schedid: "A1B21",
		postImg: "/img/example1.jpg",
	};
	res.render("viewpost", post);
});

module.exports = app;
