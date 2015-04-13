(function (pickService) {
	"use strict";

	pickService.init = function (router, auth, data, sqlapiClient) {

		router.post("/api/picks/:season/:tournament/:round/:game", auth.authenticateApi,
			function (req, res) {

				var user = req.session.passport.user.id;
				var provider = req.session.passport.user.provider;
				var season = req.params.season;
				var tournament = req.params.tournament;
				var round = req.params.round;
				var game = req.params.game;
				var pick = req.body.pick;

				data.games.get(season, tournament, round, function (err, games) {

					if (err) {
						next(err, null);
					} else {
						var currentGame = findGame(games.games, game);

						if (!hasStarted(currentGame)) {
							data.picks.update(user, provider, season, tournament, round, game, pick, function (err, result) {

								if (err) {
									console.dir(err);
									res.send(500, "Oops, something went wrong.");
								} else {
									sqlapiClient.updatePick({
										user: user,
										provider: provider,
										season: season,
										tournament: tournament,
										round: round,
										game: game,
										pick: pick
									});

									res.send(204);
								}
							});
						} else {
							res.send(403, "Game has already started.");
						}
					}
				});
			});
	};

	var hasStarted = function (game) {

		return game.hasStarted;
	};

	var findGame = function (games, game) {

		var filter = Array.prototype.filter;
		var selectedGame = filter.call(games, function (item) {

			return item.game === Number(game);
		});

		return selectedGame[0];
	};

}(module.exports));