(function (tournaments) {
	"use strict";

	var database = null;

	tournaments.init = function (db) {

		database = db;
	};

	tournaments.getBySeason = function (season, next) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				db.tournaments.find({ season: Number(season) }).sort({ name: 1 }).toArray(function (err, results) {

					if (err) {
						next(err, null);
					} else {
						var map = Array.prototype.map;
						var tournaments = map.call(results, function (tournament) {

							return {
								id: tournament.tournament,
								name: tournament.name,
								currentRound: tournament.currentRound
							};
						});

						next(null, tournaments);
					}
				});
			}
		});
	};

	tournaments.getByTournament = function (season, tournament, next) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				var criteria = {
					season: Number(season),
					tournament: Number(tournament)
				};
				
				db.tournaments.find(criteria).toArray(function (err, results) {

					if (err) {
						next(err, null);
					} else {
						try {
							next(null, results[0]);
						} catch (e) {
							console.log(e);
							next(e, null);
						}
					}
				});
			}
		});
	};

} (module.exports));