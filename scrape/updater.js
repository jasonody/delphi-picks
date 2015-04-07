(function (updater) {
	"use strict";

	var request = require("request");
	var cheerio = require("cheerio");

	updater.init = function (router, data, sqlapiClient) {

		router.get("/scrape/update/games/:season/:tournament/:round", function (req, res) {

			var season = req.params.season;
			var tournament = req.params.tournament;
			var round = req.params.round;
			var uri = "http://www.scorespro.com/soccer/england/premier-league/2014-2015/round-" + round + "/";

			data.games.get(season, tournament, round, function (err, games) {

				if (err) {
					res.send(500, err);
				} else {
					request(uri, function (err, response, html) {

						if (err) {
							res.send(500, err);
						} else {
							var $ = cheerio.load(html);

							var homeTeams = $("td.home");
							var awayTeams = $("td.away");
							var statuses = $("td.status");
							var scores = $("td.score");
							var count = homeTeams.length;
							var id = 1;

							for (var i = count - 1; i >= 0; i--) {
								var game = findGame(games.games, id);

								var homeTeam = homeTeams[i].children[homeTeams[i].children.length - 1].data.trim();
								var awayTeam = awayTeams[i].children[0].data.trim();
								var status = extractData(statuses[i]);
								var score = extractData(scores[i]).trim();

								if (game && game.home === homeTeam && game.away === awayTeam) {
									if (status.length > 0) {
										game.hasStarted = true;
										game.score = score;
										game.result = calculateResult(score);

										if (!game.isComplete && status === "FT") {
											game.isComplete = true;

											sqlapiClient.updateGame({
												season: season,
												tournament: tournament,
												round: round,
												game: game.game,
												result: game.result
											});
										}
									}
								}

								id++;
							}

							data.games.update(games);

							res.set("Content-Type", "application/json");
							res.send(games);
						}
					});
				}
			});
		});
	};

	var findGame = function (games, id) {

		var returnGame = games.filter(function (game) {

			return game.game === id;
		});

		return returnGame[0];
	};

	var extractData = function (tag) {

		var data = "";
		if (tag.children[0] && tag.children[0].data) {
			data = tag.children[0].data.trim();
		} else if (tag.children[0] && tag.children[0].children[0].data) {
			data = tag.children[0].children[0].data.trim();
		}

		return data;
	};

	var calculateResult = function (score) {

		var result = 0;

		if (score.length > 0) {
			var split = score.split("-");
			var homeScore = Number(split[0].trim());
			var awayScore = Number(split[1].trim());

			if (homeScore > awayScore) {
				result = 1;
			} else if (awayScore > homeScore) {
				result = 2;
			} else {
				result = 3;
			}
		}

		return result;
	};

} (module.exports));