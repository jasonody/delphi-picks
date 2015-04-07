(function (gameService) {
	"use strict";

	gameService.init = function (router, auth, data) {

		router.get("/api/games/:season/:tournament/:round", auth.authenticateApi,
			function (req, res) {

				var season = req.params.season;
				var tournament = req.params.tournament;
				var round = req.params.round;

				data.games.get(season, tournament, round, function (err, games) {

					if (err) {
						console.dir(err);
						res.send(500, err.message);
					} else {
						var user = req.session.passport.user.id;
						var provider = req.session.passport.user.provider;

						data.picks.get(user, provider, season, tournament, round, function (err, picks) {

							if (err) {
								console.dir(err);
								res.send(500, err.message);
							} else {
								res.set("Content-Type", "application/json");
								res.send({
									canDraw: games.canDraw,
									picks: picks,
									games: games.games
								});
							}
						});
					}
				});
			});
	};

} (module.exports));