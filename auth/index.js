(function (auth) {
	"use strict";

	var login = require("./login");
	var facebook = require("./facebook");

	auth.init = function (router, passport, data, sqlapiClient) {

		passport.serializeUser(function (user, done) {

			data.users.update(user);
			sqlapiClient.updateUser(user);

			done(null, user);
		});

		passport.deserializeUser(function (user, done) {

			done(null, user);
		});

		login.init(router);
		facebook.init(router, passport);
	};

	auth.authenticateApp = function (req, res, next) {

		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect("/login");
		}
	};

	auth.authenticateApi = function (req, res, next) {

		if (req.isAuthenticated()) {
			next();
		} else {
			res.setHeader("www-Authenticate", "realm = \"Delphi Picks\"");
			res.send(401, { error: "Not logged in." });
		}
	};

} (module.exports));