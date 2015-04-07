(function (rounds) {
	"use strict";

	var database = null;

	rounds.init = function (db) {

		database = db;
	};

	rounds.get = function (season, tournament, next) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				var criteria = {
					season: Number(season),
					tournament: Number(tournament)
				};

				db.rounds.find(criteria).toArray(function (err, results) {

					if (err) {
						next(err, null);
					} else {
						try {
							next(null, results[0].rounds);
						} catch (e) {
							console.log(e);
							next(e, null);
						}
					}
				});
			}
		});
	};

	rounds.update = function (rounds) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {

				var critera = {
					season: Number(rounds.season),
					tournament: Number(rounds.tournament)
				};

				db.rounds.update(critera, rounds, { upsert: true },
					function (err, result) {

						if (err) {
							console.log("Unable to update rounds: " + err);
						} else {
							console.log("Updated rounds: " + result);
						}
					}
				);
			}
		});
	};

} (module.exports));