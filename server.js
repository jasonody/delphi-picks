(function () {
	"use strict";

	var http = require("http");
	var express = require("express");
	var cookieParser = require("cookie-parser");
	var session = require("express-session");
	var bodyParser = require("body-parser"); //https://github.com/expressjs/body-parser
	var passport = require("passport");
	var auth = require("./auth");
	var api = require("./api");
	var sqlapiClient = require("./sqlapiClient");
	var realtime = require("./realtime");
	var data = require("./data");
	var scrape = require("./scrape");

	var app = express();
	var router = express.Router();

	app.use(express.static(__dirname + "/public"));
	app.use(cookieParser());
	app.use(session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	}));
	app.use(bodyParser.json());
	app.use(passport.initialize());
	app.use(passport.session());

	auth.init(router, passport, data, sqlapiClient);
	api.init(router, auth, data, sqlapiClient);
	scrape.init(router, data, sqlapiClient);

	router.get("/", auth.authenticateApp, function (req, res) {

		//console.dir(req.session.passport.user);
		res.redirect("/app");
	});

	//For Facebook app
	router.post("/", function (req, res) {

		res.redirect("/");
	});

	router.use(function (req, res) {

		res.send(404, "Did you get lost?");
	});

	router.use(function (err, req, res, next) {

		if (req.xhr) {
			cosole.log(err);
			res.set("Content-Type", "application/json");
			res.send(500, { message: "Oops, something went wrong." });
		} else {
			console.log(err);
			res.send(500, "Oops, something went wrong.");
		}
	});

	app.use("/", router);

	var port = process.env.PORT;
	var server = http.createServer(app);
	server.listen(port);
	console.log("Delphi Picks listening on port " + port);

	//realtime.init(server);
	console.log("Realtime updates NOT listening for sockets");
} ());