const express = require("express");
const db = require("../models/db");
const User = require("../models/UserModel.js");
const app = express();

// TODO: add in routes
app.get('/about_out', function (req, res){
	res.render('about_out');
})

app.get('/about_in', function (req, res){
	res.render('about_in');
})

app.get('/change_password', function (req, res){
	res.render('change_password');
})

app.get('/contact_out', function (req, res){
	res.render('contact_out');
})

app.get('/contact_in', function (req, res){
	res.render('contact_in');
})

app.get('/create', function (req, res){
	res.render('create');
})

app.get('/edit_account', function (req, res){
	res.render('edit_account');
})

app.get('/home_out', function (req, res){
	res.render('home_out');
})

app.get('/home_in', function (req, res){
	res.render('home_in');
})

app.get('/log_in', function (req, res){
	res.render('log_in');
})

app.get('/manage_account', function (req, res){
	res.render('manage_account');
})

app.get('/my_schedules', function (req, res){
	res.render('my_schedules');
})

app.get('/register', function (req, res){
	res.render('register');
})

app.get('/search_result', function (req, res){
	res.render('search_result');
})

app.get('/view_account', function (req, res){
	res.render('view_account');
})

app.get("/home", (req, res) => {
	var posts = [];
	for (var i = 0; i < 5; i++) {
		var post = {
			schedcard: "schedcard-" + (i + 1),
			postImg: "/img/example" + (i + 1) + ".jpg",
		};
		posts.push(post);
		console.log(posts[i].schedcard);
		console.log(posts[i].postImg);
	}
	console.log(posts.length);
	res.render("home", posts);
	console.log(posts.length);
});


module.exports = app;