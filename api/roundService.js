(function (roundService) {
	"use strict";

	roundService.init = function (router, auth, data) {

		router.get("/api/rounds/:season/:tournament", auth.authenticateApi,
			function (req, res) {

				var season = req.params.season;
				var tournament = req.params.tournament;

				data.tournaments.getByTournament(season, tournament, function (err, tournaments) {

					if (err) {
						console.dir(err);
						res.send(500, err.message);
					} else {
						data.rounds.get(season, tournament, function (err, rounds) {

							if (err) {
								console.dir(err);
								res.send(500, err.message);
							} else {
								res.set("Content-Type", "application/json");
								res.send({
									currentRound: tournaments.currentRound,
									rounds: rounds
								});
							}
						});
					}
				});
			});
	};

} (module.exports));