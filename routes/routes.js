const express = require("express");
const db = require("../models/db");
const User = require("../models/UserModel.js");
const Posts = require("../models/PostModel.js");
const Comments = require("../models/CommentModel.js");
const app = express();
const bcrypt = require("bcrypt");
const validationResult = require("express-validator");
const saltRounds = 10;

// TODO: add in routes
app.get("/about", function (req, res) {
	if (req.session.username) {
		var details = {
			flag: true,
		};
	} else {
		var details = {
			flag: false,
		};
	}

	res.render("about", details);
});

app.get("/change_password", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("change_password", details);
});

app.get("/contact", function (req, res) {
	if (req.session.username) {
		var details = {
			flag: true,
		};
	} else {
		var details = {
			flag: false,
		};
	}
	res.render("contact", details);
});

app.get("/create", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("create", details);
});

app.get("/edit_account", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("edit_account", details);
});

app.get("/log_in", function (req, res) {
	if (req.session.username) {
		/*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
                passing values using URL
                which calls getProfile() method
                defined in `./profileController.js`
            */
		res.redirect("/home/" + req.session.username);
	}
	// else if a user is not yet logged-in
	else {
		/*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
		var details = {
			flag: false,
		};

		// render `../views/login.hbs`
		res.render("log_in", details);
	}
});

app.get("/manage_account", function (req, res) {
	res.render("manage_account");
});

app.post("/log_in", function (req, res) {
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
	db.findOne(User, { username: username }, "", function (result) {
		// if a user with `username` equal to `username` exists
		console.log(result);
		if (result) {
			var user = {
				username: result.username,
				desc: result.desc,
				email: result.email,
			};
			/*
                    use compare() method of module `bcrypt`
                    to check if the password entered by the user
                    is equal to the hashed password in the database
                */
			bcrypt.compare(password, result.password, function (err, equal) {
				/*
                        if the entered password
                        match the hashed password from the database
                    */
				if (equal) {
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
					res.redirect("/home/" + user.username);
				} else {
					/*
                        else if the entered password
                        does not match the hashed password from the database
                    */
					/*
                            sets `details.flag` to false
                            to hide the profile and logout tabs in the nav bar
                        */
					var details = {
						flag: false,
						error: `ID Number and/or Password is incorrect.`,
					};
					/*
                            render `../views/login.hbs`
                            display the errors
                        */
					res.render("log_in", details);
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
				ERROR: `ID Number and/or Password is incorrect.`,
			};

			/*
                    render `../views/login.hbs`
                    display the errors
                */
			res.render("log_in", details);
		}
	});
});

app.get("/register", function (req, res) {
	var details = {};
	// checks if a user is logged-in by checking the session data
	if (req.session.username) {
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
	/*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
	else details.flag = false;
	// render `../views/signup.hbs`
	res.render("register", details);
});

app.post("/register", function (req, res) {
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
	bcrypt.hash(password, saltRounds, function (err, hash) {
		var user = {
			username: username,
			email: email,
			desc: desc,
			password: hash,
		};
		/*
                    calls the function insertOne()
                    defined in the `database` object in `../models/db.js`
                    this function adds a document to collection `users`
                */
		db.insertOne(User, user, (result) => {
			if (result) {
				/*
                            upon adding a user to the database,
                            redirects the client to `/success` using HTTP GET,
                            defined in `../routes/routes.js`
                            passing values using URL
                            which calls getSuccess() method
                            defined in `./successController.js`
                        */
				res.render("log_in");
			}
		});
	});
});

app.get("/manage_account", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("manage_account", details);
});

app.get("/my_schedules", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("my_schedules", details);
});

app.get("/search_result", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("search_result", details);
});

app.get("/view_account", function (req, res) {
	var details = {
		flag: true,
	};
	res.render("view_account", details);
});

app.get("/home", (req, res) => {
	console.log("Home Page");

	// HARDCODE add to db
	// var posts = [];
	// var titles = [
	// 	"Year 1 Term 1 Schedule",
	// 	"best sched ever",
	// 	"DL only",
	// 	"panget profs ko",
	// 	"please copy my sched",
	// ];

	// var authors = [
	// 	"sendcutdogpics",
	// 	"ironman3000",
	// 	"thorodinson",
	// 	"blackwidow69",
	// 	"captamerica",
	// ];

	// var descs = [
	// 	"This is my first scehdule.",
	// 	"i love my schedule",
	// 	"we can be friends",
	// 	"ew",
	// 	"who has the same sched???",
	// ];

	// for (var i = 0; i < 5; i++) {
	// 	var post = {
	// 		schedcard: "schedcard-" + (i + 1),
	// 		schedTitle: titles[i],
	// 		schedid: "A1B2" + (i + 1),
	// 		postImg: "/img/example" + (i + 1) + ".jpg",
	// 		schedAuthor: authors[i],
	// 		schedDesc: descs[i],
	// 		upqty: 0,
	// 		downqty: 0,
	// 	};

	// 	db.insertOne(Posts, post, (flag) => {
	// 		if (flag) {
	// 			console.log("added a post to db");
	// 		}
	// 	});

	// 	posts.push(post);
	// 	console.log(posts[i].schedcard);
	// 	console.log(posts[i].postImg);
	// }

	// get all the posts from the database
	var postshome = "schedcard schedTitle schedid postImg";
	db.findMany(Posts, {}, postshome, (result) => {
		if (result != null) {
			console.log("loading home");
			console.log(result);
			res.render("home", result);
		} else console.log("error with db");
	});

	// console.log(posts.length);
	// res.render("home", posts);
});

app.get("/viewpost/:postid", (req, res) => {
	var query = { schedid: req.params.postid };
	console.log(query);
	// find the post from the database with comments
	var postdetails =
		"schedcard schedid postImg schedTitle schedAuthor schedDesc upqty downqty";
	db.findOne(Posts, query, postdetails, (result) => {
		// TODO: ADD COMMENTS
		if (result != null) {
			console.log("redirecting to selected post");
			console.log(result);
			var post = {
				schedcard: result.schedcard,
				schedid: result.schedid,
				postImg: result.postImg,
				schedTitle: result.schedTitle,
				schedAuthor: result.schedAuthor,
				schedDesc: result.schedDesc,
				upqty: result.upqty,
				downqty: result.downqty,
				comments: [],
			};

			var commentdetails = "schedid commentid cAuthor cDesc";
			db.findMany(Comments, query, commentdetails, (result) => {
				if (result != null) {
					result.forEach((comment) => {
						post.comments.push(comment);
					});
				}
			});

			res.render("viewpost", post);
		} else {
			res.render("error");
			console.log("post not found");
		}
	});

	// HARDCODED PROTOTYPE
	// var post = {
	// 	schedcard: "schedcard-1",
	// 	schedid: "A1B21",
	// 	postImg: "/img/example1.jpg",
	// 	schedTitle: "Year 1 Term 1 Schedule",
	// 	schedAuthor: "sendcutedogpics",
	// 	schedDesc: "This is my first schedule. Please like and comment!",
	// 	upqty: 300,
	// 	downqty: 10,
	// 	comments: [
	// 		{
	// 			cAuthor: "ironman3000",
	// 			cDesc: "nice sched",
	// 		},

	// 		{
	// 			cAuthor: "thorodinson",
	// 			cDesc: "We should be friends :)",
	// 		},

	// 		{
	// 			cAuthor: "blackwidow",
	// 			cDesc: "We should be friends :)",
	// 		},

	// 		{
	// 			cAuthor: "spongebobsquarepants",
	// 			cDesc: "We should be friends :)",
	// 		},

	// 		{
	// 			cAuthor: "miketysonnnnnnnn",
	// 			cDesc: "We should be friends :)",
	// 		},
	// 	],
	// };
	// res.render("viewpost", post);
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
		// find from db
		var postres = "schedcard schedTitle schedid postImg";
		// find by username or title
		var byuser = { schedAuthor: { $regex: req.query.q, $options: "i" } };
		var bytitle = { schedTitle: { $regex: req.query.q, $options: "i" } };
		var filter = { $or: [byuser, bytitle] };
		db.findMany(Posts, filter, postres, (result) => {
			if (result.length > 0) {
				console.log("got from users or titles");
				console.log(result);
				// add them to the list
				result.forEach((post) => {
					searchquery.posts.push(post);
				});
				res.render("searchResults", searchquery);
				console.log("found posts from search");
			} else {
				res.render("emptyResults", searchquery);
				console.log("no posts found with query");
				console.log("none was found from users");
			}
		});

		// HARDCODED PROTOTYPE
		// var post = {
		// 	schedcard: "schedcard-1",
		// 	schedid: "A1B21",
		// 	postImg: "/img/example1.jpg",
		// };
		// searchquery.posts.push(post);
		// console.log(searchquery.posts[0].schedcard);
		// console.log(searchquery.posts[0].postImg);

		// console.log(searchquery.posts.length);
		// res.render("searchResults", searchquery);
	}
});

app.get("/upvoteInc", (req, res) => {
	var schedid = req.query.schedid;
	console.log("increasing upvote by 1");
	db.updateOne(
		Posts,
		{ schedid: schedid },
		{ $inc: { upqty: 1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ schedid: schedid },
					"schedid upqty",
					function (result) {
						if (result != null) {
							console.log("RESULTS\n" + result);
							res.send(result);
						} else {
							console.log("error");
							res.send(null);
						}
					}
				);
			} else {
				console.log("error updating upvote count");
				res.send(null);
			}
		}
	);
});

app.get("/upvoteDec", (req, res) => {
	var schedid = req.query.schedid;
	console.log("decreasing upvote by 1");
	db.updateOne(
		Posts,
		{ schedid: schedid },
		{ $inc: { upqty: -1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ schedid: schedid },
					"schedid upqty",
					function (result) {
						if (result != null) {
							console.log("RESULTS\n" + result);
							res.send(result);
						} else {
							console.log("error");
							res.send(null);
						}
					}
				);
			} else {
				console.log("error updating upvote count");
				res.send(null);
			}
		}
	);
});

app.get("/downDecupInc", (req, res) => {
	var schedid = req.query.schedid;
	console.log("decreasing downvote by 1 & increasing upvote by 1");
	db.updateOne(
		Posts,
		{ schedid: schedid },
		{ $inc: { upqty: 1, downqty: -1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ schedid: schedid },
					"schedid upqty downqty",
					function (result) {
						if (result != null) {
							console.log("RESULTS\n" + result);
							res.send(result);
						} else {
							console.log("error");
							res.send(null);
						}
					}
				);
			} else {
				console.log("error updating upvote count");
				res.send(null);
			}
		}
	);
});

app.get("/downvoteInc", (req, res) => {
	var schedid = req.query.schedid;
	console.log("increasing downvote by 1");
	db.updateOne(
		Posts,
		{ schedid: schedid },
		{ $inc: { downqty: 1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ schedid: schedid },
					"schedid downqty",
					function (result) {
						if (result != null) {
							console.log("RESULTS\n" + result);
							res.send(result);
						} else {
							console.log("error");
							res.send(null);
						}
					}
				);
			} else {
				console.log("error updating upvote count");
				res.send(null);
			}
		}
	);
});

app.get("/downvoteDec", (req, res) => {
	var schedid = req.query.schedid;
	console.log("decreasing downvote by 1");
	db.updateOne(
		Posts,
		{ schedid: schedid },
		{ $inc: { downqty: -1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ schedid: schedid },
					"schedid downqty",
					function (result) {
						if (result != null) {
							console.log("RESULTS\n" + result);
							res.send(result);
						} else {
							console.log("error");
							res.send(null);
						}
					}
				);
			} else {
				console.log("error updating upvote count");
				res.send(null);
			}
		}
	);
});

app.get("/upDecdownInc", (req, res) => {
	var schedid = req.query.schedid;
	console.log("decreasing upvote by 1 & increasing downvote by 1");
	db.updateOne(
		Posts,
		{ schedid: schedid },
		{ $inc: { downqty: 1, upqty: -1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ schedid: schedid },
					"schedid upqty downqty",
					function (result) {
						if (result != null) {
							console.log("RESULTS\n" + result);
							res.send(result);
						} else {
							console.log("error");
							res.send(null);
						}
					}
				);
			} else {
				console.log("error updating upvote count");
				res.send(null);
			}
		}
	);
});

app.get("/addComment", (req, res) => {
	var comment = {
		schedid: req.query.schedid,
		commentid: req.query.commentid,
		cAuthor: req.query.cAuthor,
		cDesc: req.query.cDesc,
	};

	console.log("adding comment to db");
	db.insertOne(Comments, comment, (result) => {
		res.send(result);
	});
});

app.get("/my_posts/:username", (req, res) => {
	var query = { username: req.params.username };
	console.log(query);
	// find the post from the database with comments
	var postshome = "schedcard schedTitle schedid postImg";
	db.findMany(Posts, query, postshome, (result) => {
		if (result != null) {
			console.log("loading my posts");
			console.log(result);
			res.render("home", result);
		} else console.log("error with db");
	});
});

module.exports = app;
