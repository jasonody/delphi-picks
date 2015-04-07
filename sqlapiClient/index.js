(function (sqlapiClient) {
	"use strict";

	var http = require("DEV" ? "http" : "https");
	var querystring = require("querystring");

	sqlapiClient.updateUser = function (user) {

		var userDetails = {
			id: user.id,
			displayName: user.displayName,
			provider: user.provider
		};

		var qs = querystring.stringify(userDetails);
		var path = process.env.SQL_API_PATH + "/user?" + qs;

		executePost(path);
	};

	sqlapiClient.updatePick = function (pick) {

		var pickDetails = pick;
		pickDetails.userId = pick.user;
		pickDetails.pickCode = pick.pick;
		delete pickDetails.user;
		delete pickDetails.pick;

		var qs = querystring.stringify(pickDetails);
		var path = process.env.SQL_API_PATH + "/pick?" + qs;

		executePost(path);
	};

	sqlapiClient.updateGame = function (game) {

		var gameDetails = game;
		game.resultCode = game.result;
		delete game.result;

		var qs = querystring.stringify(gameDetails);
		var path = process.env.SQL_API_PATH + "/game?" + qs;

		executePost(path);
	};

	sqlapiClient.getLeaderboard = function (season, tournament, round, next) {

		var params = {
			season: season,
			tournament: tournament,
			round: round
		};
		var qs = querystring.stringify(params);
		var path = process.env.SQL_API_PATH + "/leaderboard?" + qs;

		executeGet(path, next);
	};

	var executePost = function (path) {

		var options = {
			hostname: process.env.SQL_API_HOST,
			path: path,
			method: "POST"
		};

		//TODO: POST in body:
		//http://nodejs.org/api/http.html#http_http_request_options_callback
		//http://stackoverflow.com/questions/6158933/how-to-make-an-http-post-request-in-node-js
		var req = http.request(options, function (res) {

			res.on("data", function (chunk) {

				//Do nothing
			});
		});

		req.on("error", function (err) {

			console.log("Error:");
			console.dir(err);
		});

		req.end();
	};

	var executeGet = function (path, next) {

		var options = {
			hostname: process.env.SQL_API_HOST,
			path: path,
			method: "GET"
		};

		var req = http.request(options, function (res) {

			var body = null;
			res.on("data", function (chunk) {

				if (body === null) {
					body = chunk;
				} else {
					body += chunk;
				}
			});

			res.on("end", function () {

				next(null, JSON.parse(body));
			});
		});

		req.on("error", function (err) {

			next(err, null);
		});

		req.end();
	};

} (module.exports));