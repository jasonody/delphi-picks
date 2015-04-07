(function (games) {
	"use strict";

	var database = null;

	games.init = function (db) {

		database = db;
	};

	games.get = function (season, tournament, round, next) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				var critera = {
					season: Number(season),
					tournament: Number(tournament),
					round: Number(round)
				};

				db.games.find(critera).toArray(function (err, results) {

					if (err) {
						next(err, null);
					} else {
						try {
							next(null, results[0]);
						} catch (e) {
							console.dir(e);
							next(e, null);
						}
					}
				});
			}
		});
	};

	games.insert = function (games) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {

				db.games.insert(games, function (err) {

					if (err) {
						console.log("Failed to insert games: " + err);
					}
				});
			}
		});
	};

	games.update = function (games) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				var critera = {
					season: Number(games.season),
					tournament: Number(games.tournament),
					round: Number(games.round)
				};

				db.games.update(critera, games, { upsert: true },
					function (err, result) {

						if (err) {
							console.log("Unable to update games: " + err);
						}
					}
				);
			}
		});
	};

} (module.exports));