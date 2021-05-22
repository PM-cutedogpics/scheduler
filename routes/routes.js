const express = require("express");
const mongoose = require("mongoose");
const db = require("../models/db");
const User = require("../models/UserModel.js");
const Posts = require("../models/PostModel.js");
const Comments = require("../models/CommentModel.js");
const defaultclasses = require("../models/DefaultClassModel.js");
const Schedules = require("../models/ScheduleModel.js");
const app = express();
const bcrypt = require("bcrypt");
const validationResult = require("express-validator");
const saltRounds = 10;
// TODO: add in routes
app.get("/about", function (req, res) {
	if (req.session.username) {
		var details = {
			username: req.session.username,
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
		username: req.session.username,
		flag: true,
	};
	res.render("change_password", details);
});

app.get("/contact", function (req, res) {
	if (req.session.username) {
		var details = {
			username: req.session.username,
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
	if (req.session.username) {
		var query = {
			flag: true,
			username: req.session.username,
		};

		db.findMany(defaultclasses, {}, "classId className", function (result) {
			if (result != null) {
				console.log("Loading default classes from DB");
				var classList = [];
				for (var j = 0; j < result.length; j++) {
					classList.push({
						classId: result[j].classId,
						fullName: result[j].className,
						className: result[j].className.substring(0, 7),
					});
				}
				query.classList = classList;
				console.log(query);

				res.render("create", query);
			} else console.log("Error finding default classes");
		});
	} else {
		res.redirect("home");
	}
});

app.get("/getScheduleName", (req, res) => {
	console.log("Checking schedule name from db");
	console.log(req.query.scheduleName);
	console.log(req.query.username);
	db.findOne(
		Schedules,
		{ schedName: req.query.scheduleName, username: req.query.username },
		"schedName username",
		function (result) {
			res.send(result);
		}
	);
});

app.get("/getScheduleId", (req, res) => {
	console.log("Checking schedule Id from db");
	console.log(req.query.scheduleName);
	console.log(req.query.username);
	db.findOne(Schedules, { schedName: req.query.scheduleName, username: req.query.username }, "_id", function (result) {
		console.log(result);
		res.send(result);
	});
});

app.get("/addScheduleName", (req, res) => {
	console.log("Adding schedule name to db");
	console.log(req.query.scheduleName);
	console.log(req.query.username);
	db.insertOne(
		Schedules,
		{ schedName: req.query.scheduleName, username: req.query.username,
		schedId: req.query.schedId, classCnt: 9 },
		function (result) {
			console.log(result);
			res.send(result);
		}
	);
});

app.get("/updateScheduleName", (req, res) => {
	console.log("Updating schedule name");
	console.log("Finding " + req.query.oldScheduleName);
	console.log("Changing to " + req.query.newScheduleName);
	db.updateOne(
		Schedules,
		{ schedName: req.query.oldScheduleName, username: req.query.username },
		{ schedName: req.query.newScheduleName },
		(result) => {
			if (result) {
				console.log("Updated schedule name in db");
				res.send(result);
			} else {
				res.send(null);
				console.log("Failed to upload schedule in db");
			}
		}
	);
});

app.get("/saveSchedule", (req, res) => {
	console.log("Attempting to save schedule and classes to db");
	console.log(req.query.schedule);
	console.log(req.query.schedule.schedId);
	db.updateOne(Schedules, { _id: req.query.schedule.schedId}, 
		{classCnt: req.query.schedule.classCnt, 
		classes : req.query.schedule.classes}, (result) => {
		if (result > 0) {
			console.log("Successful updating schedule")
			res.send(result);
		} else {
			console.log("Error updating schedule");
			res.send(null);
		}
	});
});

app.get("/edit_account", function (req, res) {
	var details = {
		username: req.session.username,
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
		res.redirect("home");
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
	var details = {
		username: req.session.username,
		flag: true,
	};
	res.render("manage_account", details);
});

app.post("/log_in", function (req, res) {
	/*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="username">
            can be retrieved using `req.body.idNum`
        */
	console.log("here");
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
					res.redirect("home");
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
					console.log("this");
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
			console.log("that");
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
				req.session.username = user.username;
				res.redirect("/home");
			} else console.log("ERROR");
		});
	});
});

app.get("/checkID", function (req, res) {
	var username = req.query.username;

	db.findOne(User, { username: username }, "username", function (result) {
		res.send(result);
	});
});

app.get("/logout", function (req, res) {
	req.session.destroy(function (err) {
		if (err) throw err;
		res.redirect("home");
	});
});

app.get("/my_schedules", function (req, res) {
	var currUser = req.session.username;
	var scheduleDetails =
		"schedName classCnt _id";
	db.findMany(Schedules, { username: currUser }, scheduleDetails, (result) => {
		if (result != null) {
			console.log("Loading my schedules");
			var details = {
				flag: true,
				result: result,
				username: req.session.username,
			};
			console.log(result);
			res.render("my_schedules", details);
		} else {
			console.log("error loading my posts");
		}
	});
});

app.get("/view_account", function (req, res) {
	var details = {
		flag: true,
		username: req.session.username,
	};
	res.render("view_account", details);
});

/*
	opens the home page of the web app
	gets all the posts from the database and displays them 

*/
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

	console.log(req.session.username);
	if (req.session.username) {
		// get all the posts from the database
		var postshome = "schedcard schedTitle _id postImg";
		db.findMany(Posts, {}, postshome, (result) => {
			if (result != null) {
				console.log("loading home");
				console.log(result);
				var details = {
					flag: true,
					result: result,
					username: req.session.username,
				};
				res.render("home", details);
			} else console.log("error with db");
		});
	} else {
		// get all the posts from the database
		var postshome = "schedcard schedTitle _id postImg";
		db.findMany(Posts, {}, postshome, (result) => {
			if (result != null) {
				console.log("loading home");
				console.log(result);
				var details = {
					flag: false,
					result: result,
				};
				res.render("home", details);
			} else console.log("error with db");
		});
	}

	// console.log(posts.length);
	// res.render("home", posts);
});

/*
	when a post has been clicked
	View a post of a certain post
	opens a new page of the post with upvotes, downvotes, and comments 
*/
app.get("/viewpost/:postid", (req, res) => {
	var user = req.session.username;
	console.log("in session: " + user);
	var query = { _id: req.params.postid };
	console.log(query);
	// find the post from the database with comments
	var postdetails =
		"schedcard _id postImg schedTitle schedAuthor schedDesc upqty downqty";
	db.findOne(Posts, query, postdetails, (result) => {
		if (result != null) {
			console.log("redirecting to selected post");
			console.log(result);
			var post = {
				loggedUser: user,
				_id: result._id,
				postImg: result.postImg,
				schedTitle: result.schedTitle,
				schedAuthor: result.schedAuthor,
				schedDesc: result.schedDesc,
				upqty: result.upqty,
				downqty: result.downqty,
				comments: [],
			};

			var commentdetails = "schedid cAuthor cDesc";
			db.findMany(
				Comments,
				{ schedid: req.params.postid },
				commentdetails,
				(result) => {
					if (result != null) {
						console.log(result);
						result.forEach((comment) => {
							post.comments.push(comment);
						});
					}
				}
			);
			var details;
			if (req.session.username) details = { flag: true, post: post, username: req.session.username};
			else details = { flag: false, post: post };
			res.render("viewpost", details);
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

/*
	Shows the search result from the search form in the header
	retrieves 0 to many posts
	if there are 0 matching posts, it says none has been found
*/
app.get("/searchResults", (req, res) => {
	var currUser = req.session.username;
	var details = {};
	if (req.query.q <= 0) {
		res.redirect("/home");
	} else {
		var searchquery = {
			query: req.query.q,
			posts: [],
		};
		console.log("Search Results for: " + searchquery.query);
		// query the posts that have the following keyword (QUERY)s
		// find from db
		var postres = "schedTitle _id postImg";
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

				if (currUser)
					details = { flag: true, searchquery: searchquery, username: req.session.username,};
				else details = { flag: false, searchquery: searchquery };
				console.log(details);
				res.render("searchResults", details);
				console.log("found posts from search");
			} else {
				if (currUser)
					details = { flag: true, searchquery: searchquery, username: req.session.username};
				else details = { flag: false, searchquery: searchquery };
				console.log(details);
				res.render("emptyResults", details);
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

/*
	when the upvote button has been clicked but the downvote is not active
	increase the number of upvotes
*/
app.get("/upvoteInc", (req, res) => {
	var schedid = req.query._id;
	var query = {
		_id: req.query._id,
	};
	console.log(schedid);
	console.log("increasing upvote by 1");
	db.updateOne(Posts, query, { $inc: { upqty: 1 } }, (result) => {
		if (result) {
			console.log("returning updated schedule");
			db.findOne(Posts, query, "_id upqty", function (result) {
				if (result != null) {
					console.log("RESULTS\n" + result);
					res.send(result);
				} else {
					console.log("error");
					res.send(null);
				}
			});
		} else {
			console.log("error updating upvote count");
			res.send(null);
		}
	});
});

/*
	when upvote has been clicked and it is active
	reduce the amount of upvotes
*/
app.get("/upvoteDec", (req, res) => {
	var schedid = req.query._id;
	var query = { _id: req.query._id };
	console.log("decreasing upvote by 1");
	db.updateOne(Posts, query, { $inc: { upqty: -1 } }, (result) => {
		if (result) {
			console.log("returning updated schedule");
			db.findOne(Posts, query, "_id upqty", function (result) {
				if (result != null) {
					console.log("RESULTS\n" + result);
					res.send(result);
				} else {
					console.log("error");
					res.send(null);
				}
			});
		} else {
			console.log("error updating upvote count");
			res.send(null);
		}
	});
});

/*
	when upvote is clicked and downvote is active
	reduce downvote by 1 and add 1 to upvote
*/
app.get("/downDecupInc", (req, res) => {
	var schedid = req.query._id;
	var query = { _id: req.query._id };
	console.log("decreasing downvote by 1 & increasing upvote by 1");
	db.updateOne(
		Posts,
		query,
		{ $inc: { upqty: 1, downqty: -1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					query,
					"_id upqty downqty",
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

/*
	when downvote is clicked and upvote is not active
	increase downvote by 1
*/
app.get("/downvoteInc", (req, res) => {
	var schedid = req.query._id;
	var query = { _id: req.query._id };
	console.log("increasing downvote by 1");
	db.updateOne(Posts, query, { $inc: { downqty: 1 } }, (result) => {
		if (result) {
			console.log("returning updated schedule");
			db.findOne(Posts, query, "_id downqty", function (result) {
				if (result != null) {
					console.log("RESULTS\n" + result);
					res.send(result);
				} else {
					console.log("error");
					res.send(null);
				}
			});
		} else {
			console.log("error updating upvote count");
			res.send(null);
		}
	});
});

/*
	when downvote is clicked and it is active
	decrease downvote by one 
*/
app.get("/downvoteDec", (req, res) => {
	var schedid = req.query._id;
	var query = { _id: req.query._id };
	console.log("decreasing downvote by 1");
	db.updateOne(Posts, query, { $inc: { downqty: -1 } }, (result) => {
		if (result) {
			console.log("returning updated schedule");
			db.findOne(Posts, query, "_id downqty", function (result) {
				if (result != null) {
					console.log("RESULTS\n" + result);
					res.send(result);
				} else {
					console.log("error");
					res.send(null);
				}
			});
		} else {
			console.log("error updating upvote count");
			res.send(null);
		}
	});
});

/*
	when downvote is clicked and upvote is active
	reduce upvote by 1 and increase downvote by 1
*/
app.get("/upDecdownInc", (req, res) => {
	var schedid = req.query._id;
	var query = { _id: req.query._id };
	console.log("decreasing upvote by 1 & increasing downvote by 1");
	db.updateOne(
		Posts,
		{ _id: schedid },
		{ $inc: { downqty: 1, upqty: -1 } },
		(result) => {
			if (result) {
				console.log("returning updated schedule");
				db.findOne(
					Posts,
					{ _id: schedid },
					"_id upqty downqty",
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

/*
	when you submit a comment, it is added to the database
*/
app.get("/addComment", (req, res) => {
	var comment = {
		schedid: req.query._id,
		commentid: req.query.commentid,
		cAuthor: req.session.username,
		cDesc: req.query.cDesc,
	};

	console.log("adding comment to db");
	db.insertOne(Comments, comment, (result) => {
		if (result) {
			console.log("added comment to database");

			db.findOne(
				Comments,
				{
					schedid: comment.schedid,
					commentid: comment.commentid,
					cAuthor: comment.cAuthor,
					cDesc: comment.cDesc,
				},
				"schedid commentid cAuthor cDesc",
				(result) => {
					if (result != null) {
						console.log("found comment");
						res.send(result);
					} else console.log("comment added not found");
				}
			);
		} else {
			console.log("error adding comment to database");
		}
	});
});

app.get("/deletecomment", (req, res) => {
	var commentid = req.query.commentid;
	console.log("deleting comment from database");
	db.deleteOne(Comments, { _id: commentid }, (result) => {
		if (result) console.log("SUCCESS deleting comment");
		else console.log("FAILED deleting comment");
	});
});

/*
	redirects to my posts to see the current user's posts with imgs
*/
app.get("/my_posts", (req, res) => {
	var currUser = req.session.username;
	var postDetails =
		"schedcard schedid postImg schedTitle schedAuthor schedDesc upqty downqty";
	db.findMany(Posts, { schedAuthor: currUser }, postDetails, (result) => {
		if (result != null) {
			console.log("loading my posts");
			var details = {
				flag: true,
				result: result,
				username: req.session.username,
			};
			res.render("my_posts", details);
		} else {
			console.log("error loading my posts");
		}
	});
});

app.get("/editpost/:schedid", (req, res) => {
	var schedid = req.params.schedid;
	var scheddet = "postImg schedTitle _id schedAuthor schedDesc";
	db.findOne(Posts, { _id: schedid }, scheddet, (result) => {
		if (result != null) {
			var details = {
				flag: true,
				post: result,
				username: req.session.username,
			};
			res.render("edit_post", details);
		} else console.log("error editing post");
	});
});

app.get("/deletepost/:schedid", (req, res) => {
	var schedid = req.params.schedid;
	db.deleteOne(Posts, { _id: schedid }, (result) => {
		if (result) {
			res.redirect("/my_posts");
		} else console.log("error removing post");
	});
});

app.post("/save_edits", (req, res) => {
	var schedid = req.body.schedid;
	console.log(schedid);
	db.updateOne(
		Posts,
		{ _id: schedid },
		{
			$set: {
				schedTitle: req.body.schedTitle,
				schedDesc: req.body.schedDesc,
			},
		},
		(error) => {
			if (!error) console.log("failed to update");
			else res.redirect("/my_posts");
		}
	);
});

app.get("/create_post", (req, res) => {
	res.render("create_post");
});

app.post("/create_post", (req, res) => {
	var postDetails = {
		schedTitle: req.body.schedTitle,
		schedAuthor: req.session.username,
		schedDesc: req.body.schedDesc,
		postImg: "/img/example5.jpg", // use multer
		upqty: 0,
		downqty: 0,
	};
	console.log("posting new post");
	console.log(postDetails);
	db.insertOne(Posts, postDetails, (result) => {
		if (result) res.redirect("/my_posts");
		else console.log("error posting schdule");
	});
});

module.exports = app;
