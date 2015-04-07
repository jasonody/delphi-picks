(function (tournamentService) {
	"use strict";

	tournamentService.init = function (router, auth, data) {

		router.get("/api/tournaments/:season", auth.authenticateApi,
			function (req, res) {

				var season = req.params.season;

				data.tournaments.getBySeason(season, function (err, tournaments) {

					if (err) {
						console.dir(err);
						res.send(500, err.message);
					} else {
						res.set("Content-Type", "application/json");
						res.send({ tournaments: tournaments });
					}
				});
			}
		);
	};

} (module.exports));