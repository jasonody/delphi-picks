(function (inserter) {
	"use strict";

	var request = require("request");
	var cheerio = require("cheerio");

	inserter.init = function (router, data) {

		router.get("/scrape/insert/rounds/:season/:tournament", function (req, res) {

			var season = req.params.season;
			var tournament = req.params.tournament;
			var end = req.query.end || 0;
			var active = req.query.active || 1;

			var rounds = {
				season: Number(season),
				tournament: Number(tournament),
				rounds: []
			};

			for (var i = 1; i <= end; i++) {
				var round = {
					round: i,
					name: "Week " + i,
					isCurrent: i === Number(active) ? true : false
				};

				rounds.rounds.push(round);
			}

			data.rounds.update(rounds);

			res.set("Content-Type", "application/json");
			res.send(rounds);
		});

		router.get("/scrape/insert/games/:season/:tournament/:round", function (req, res) {

			var season = req.params.season;
			var tournament = req.params.tournament;
			var round = req.params.round;
			var uri = "http://www.scorespro.com/soccer/england/premier-league/2014-2015/round-" + round + "/";

			request(uri, function (err, response, html) {

				if (err) {
					res.send(500, err);
				} else {
					var $ = cheerio.load(html);

					var homeTeams = $("td.home");
					var awayTeams = $("td.away");
					var count = homeTeams.length;
					var id = 1;

					var games = {
						season: Number(season),
						tournament: Number(tournament),
						round: Number(round),
						canDraw: true,
						games: []
					};

					for (var i = count - 1; i >= 0; i--) {
						var game = {
							game: Number(id),
							home: homeTeams[i].children[homeTeams[i].children.length - 1].data.trim(),
							away: awayTeams[i].children[0].data.trim(),
							isComplete: false,
							hasStarted: false,
							result: 0,
							score: null
						};

						games.games.push(game);
						id++;
					}

					data.games.insert(games);
					res.set("Content-Type", "application/json");
					res.send(games);
				}
			});
		});
	};
} (module.exports));