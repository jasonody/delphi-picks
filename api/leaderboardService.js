(function (leaderboardService) {
	"use strict";

	leaderboardService.init = function (router, auth, sqlapiClient) {

		router.get("/api/leaderboard/:season/:tournament/:round", auth.authenticateApi,
			function (req, res) {

				var season = req.params.season;
				var tournament = req.params.tournament;
				var round = req.params.round;

				sqlapiClient.getLeaderboard(season, tournament, round, function (err, leaderboard) {

					if (err) {
						console.dir(err);
						res.send(500, err.message);
					} else {
						res.set("Content-Type", "application/json");
						res.send({ leaderboard: leaderboard });
					}
				});
			});
	};

} (module.exports));