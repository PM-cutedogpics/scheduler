const express = require("express");
const hbs = require("hbs");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = require("./models/db.js");

const app = express();
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("inSession", (loggedUser, cAuthor, options) => {
	console.log(cAuthor);
	console.log(loggedUser);
	if (cAuthor == loggedUser) return options.fn(this);
});
dotenv.config();
hostname = process.env.HOSTNAME;
port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
	session({
		secret: "ccapdev-session",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

app.use("/", routes);

app.use((req, res) => {
	res.render("error");
});

db.connect();

app.listen(port, hostname, () => {
	console.log(
		"server running at: " + "http://" + hostname + ":" + port + "/home"
	);
});

hbs.registerHelper("ifEquals", function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});