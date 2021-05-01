const { query } = require("express");
const express = require("express");
const db = require("../models/db");
const User = require("../models/UserModel.js");
const app = express();
const bcrypt = require('bcrypt');
// const validation = require('../helpers/validation.js');

// TODO: add in routes
app.get("/about_out", function (req, res) {
	res.render("about_out");
});

app.get("/about_in", function (req, res) {
	res.render("about_in");
});

app.get("/change_password", function (req, res) {
	res.render("change_password");
});

app.get("/contact_out", function (req, res) {
	res.render("contact_out");
});

app.get("/contact_in", function (req, res) {
	res.render("contact_in");
});

app.get("/create", function (req, res) {
	res.render("create");
});

app.get("/edit_account", function (req, res) {
	res.render("edit_account");
});

app.get("/home_out", function (req, res) {
	res.render("home_out");
});

app.get("/home_in", function (req, res) {
	res.render("home_in");
});

app.get("/log_in", function (req, res) {
	  if(req.session.username) {

            /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
                passing values using URL
                which calls getProfile() method
                defined in `./profileController.js`
            */
            res.redirect('/home/' + req.session.username);
        }
        // else if a user is not yet logged-in
        else {

            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            var details = {
                flag: false
            };

            // render `../views/login.hbs`
            res.render('log_in', details);
        }
});

app.get("/manage_account", function (req, res) {
	res.render("manage_account");
});

app.post('/log_in', function (req, res){
	/*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="username">
            can be retrieved using `req.body.idNum`
        */
        var username = req.body.username;
        var password = req.body.password;
        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            this function finds a document from collection `users`
            where `username` is equal to `username`
        */
        db.findOne(User, {username: username}, '', function (result) {
            // if a user with `username` equal to `username` exists
            if(result) {
                var user = {
                    username: result.username,
                    desc: result.desc,
                    email: result.email
                };
                /*
                    use compare() method of module `bcrypt`
                    to check if the password entered by the user
                    is equal to the hashed password in the database
                */
                bcrypt.compare(password, result.password, function(err, equal) {
                    /*
                        if the entered password
                        match the hashed password from the database
                    */
                    if(equal) {
                        /*
                            stores `user.username` to `req.session.username`
                            stores `user.fName` to `req.session.name`
                            these values are stored to the `req.session` object
                            to indicate that a user is logged-in
                            these values will be removed
                            if the user logs-out from the web application
                        */
                        req.session.username = user.username;
                        /*
                            redirects the client to `/profile/idNum`
                            where `username` is equal
                            to the `username` entered by the user
                            defined in `../routes/routes.js`
                            which calls getProfile() method
                            defined in `./profileController.js`
                        */
                        res.redirect('/home/' + user.username);
                    }
                    /*
                        else if the entered password
                        does not match the hashed password from the database
                    */
                    else {
                        /*
                            sets `details.flag` to false
                            to hide the profile and logout tabs in the nav bar
                        */
                        var details = {
                            flag: false,
                            error: `ID Number and/or Password is incorrect.`
                        };
                        /*
                            render `../views/login.hbs`
                            display the errors
                        */
                        res.render('log_in', details);
                    }
                });
            }
            // else if a user with `idNum` equal to `idNum` does not exist
            else {

                /*
                    sets `details.flag` to false
                    to hide the profile and logout tabs in the nav bar
                */
                var details = {
                    flag: false,
                    error: `ID Number and/or Password is incorrect.`
                };

                /*
                    render `../views/login.hbs`
                    display the errors
                */
                res.render('log_in', details);
            }
        });
})

app.get('/register', function (req,res){
	 var details = {};
        // checks if a user is logged-in by checking the session data
        if(req.session.username) {
            /*
                sets `details.flag` to true
                to display the profile and logout tabs in the nav bar
                sets the value of `details.name` to `req.session.name`
                to display the name of the logged-in user
                in the profile tab of the nav bar
                sets the value of `details.username` to `req.session.username`
                to provide the link the profile of the logged-in user
                in the profile tab of the nav bar
                these values are rendered in `../views/partials/header.hbs`
            */
            details.flag = true;
            details.username = req.session.username;
        }
        // else if a user is not yet logged-in
        else
            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            details.flag = false;
        // render `../views/signup.hbs`
        res.render('register', details);

})

app.post('/register', function (req, res) {
    // checks if there are validation errors
        var errors = validationResult(req);
        // if there are validation errors
        if (!errors.isEmpty()) {
            // get the array of errors
            errors = errors.errors;

            var details = {};

            // checks if a user is logged-in by checking the session data
            if(req.session.username) {
                /*
                    sets `details.flag` to true
                    to display the profile and logout tabs in the nav bar
                    sets the value of `details.name` to `req.session.name`
                    to display the name of the logged-in user
                    in the profile tab of the nav bar
                    sets the value of `details.uidNum` to `req.session.idNum`
                    to provide the link the profile of the logged-in user
                    in the profile tab of the nav bar
                    these values are rendered in `../views/partials/header.hbs`
                */
                details.flag = true;
                details.username = req.session.username;
            }
            // else if a user is not yet logged-in
            else
                /*
                    sets `details.flag` to false
                    to hide the profile and logout tabs in the nav bar
                */
                details.flag = false;
            /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg`
                as defined in the validation middlewares
                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            /*
                render `../views/signup.hbs`
                display the errors defined in the object `details`
            */
            res.render('register', details);
        }
        else {
            /*
                when submitting forms using HTTP POST method
                the values in the input fields are stored in `req.body` object
                each <input> element is identified using its `name` attribute
                Example: the value entered in <input type="text" name="fName">
                can be retrieved using `req.body.fName`
            */
            var username = req.body.username;
            var email = req.body.email;
            var desc = req.body.desc;
            var password = req.body.password;
            /*
                use hash() method of module `bcrypt`
                to hash the password entered by the user
                the hashed password is stored in variable `hash`
                in the callback function
            */
            bcrypt.hash(pw, saltRounds, function(err, hash) {
                var user = {
                    username: username,
                    email: email,
                    desc: desc,
                    password: hash
                }
                /*
                    calls the function insertOne()
                    defined in the `database` object in `../models/db.js`
                    this function adds a document to collection `users`
                */
                db.insertOne(User, user, function(flag) {
                    if(flag) {
                        /*
                            upon adding a user to the database,
                            redirects the client to `/success` using HTTP GET,
                            defined in `../routes/routes.js`
                            passing values using URL
                            which calls getSuccess() method
                            defined in `./successController.js`
                        */
                        res.redirect('log_in');
                    }
                });
            });
        }
})

app.get('/manage_account', function (req, res){
	res.render('manage_account');
})

app.get("/manage_account", function (req, res) {
	res.render("manage_account");
});

app.get("/my_schedules", function (req, res) {
	res.render("my_schedules");
});

app.get("/search_result", function (req, res) {
	res.render("search_result");
});

app.get("/view_account", function (req, res) {
	res.render("view_account");
});

app.get("/home", (req, res) => {
	var titles = [
		"Year 1 Term 1 Schedule",
		"best sched ever",
		"DL only",
		"panget profs ko",
		"please copy my sched",
	];
	var posts = [];
	console.log("Home Page");
	// get all the posts from the database
	for (var i = 0; i < 5; i++) {
		var post = {
			schedcard: "schedcard-" + (i + 1),
			schedTitle: titles[i],
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
	var query = { postid: req.params.postid };
	// find the post from the database with comments
	var post = {
		schedcard: "schedcard-1",
		schedid: "A1B21",
		postImg: "/img/example1.jpg",
		schedTitle: "Year 1 Term 1 Schedule",
		schedAuthor: "sendcutedogpics",
		schedDesc: "This is my first schedule. Please like and comment!",
		upqty: 300,
		downqty: 10,
		comments: [
			{
				cAuthor: "ironman3000",
				cDesc: "nice sched",
			},

			{
				cAuthor: "thorodinson",
				cDesc: "We should be friends :)",
			},

			{
				cAuthor: "blackwidow",
				cDesc: "We should be friends :)",
			},

			{
				cAuthor: "spongebobsquarepants",
				cDesc: "We should be friends :)",
			},

			{
				cAuthor: "miketysonnnnnnnn",
				cDesc: "We should be friends :)",
			},
		],
	};
	res.render("viewpost", post);
});

app.get("/searchResults", (req, res) => {
	if (req.query.q <= 0) {
		res.redirect("/home");
	} else {
		var searchquery = {
			query: req.query.q,
			posts: [],
		};
		console.log("Search Results for: " + searchquery.query);
		// query the posts that have the following keyword (QUERY)

		var post = {
			schedcard: "schedcard-1",
			schedid: "A1B21",
			postImg: "/img/example1.jpg",
		};
		searchquery.posts.push(post);
		console.log(searchquery.posts[0].schedcard);
		console.log(searchquery.posts[0].postImg);

		console.log(searchquery.posts.length);
		res.render("searchResults", searchquery);
	}
});
module.exports = app;
