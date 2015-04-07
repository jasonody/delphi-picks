(function (picks) {
	"use strict";

	var database = null;

	picks.init = function (db) {

		database = db;
	};

	picks.get = function (user, provider, season, tournament, round, next) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				var criteria = {
					user: user,
					provider: provider,
					season: Number(season),
					tournament: Number(tournament),
					round: Number(round)
				};

				db.picks.find(criteria).toArray(function (err, results) {

					if (err) {
						next(err, null);
					} else {
						var map = Array.prototype.map;
						var picks = map.call(results, function (pick) {

							return {
								game: pick.game,
								pick: pick.pick
							};
						});

						next(null, picks);
					}
				});
			}
		});
	};

	picks.update = function (user, provider, season, tournament, round, game, pick, next) {

		database.getDb(function (err, db) {

			if (err) {
				next(err, null);
			} else {
				var criteria = {
					user: user,
					provider: provider,
					season: Number(season),
					tournament: Number(tournament),
					round: Number(round),
					game: Number(game)
				};

				var update = {
					user: user,
					provider: provider,
					season: Number(season),
					tournament: Number(tournament),
					round: Number(round),
					game: Number(game),
					pick: Number(pick)
				};
				
				//http://docs.mongodb.org/manual/reference/method/db.collection.update/
				db.picks.update(criteria, update, { upsert: true },
					function (err, result) {
						
						if (err) {
							next(err, null);
						} else {
							next(null, result);
						}
					}
				);
			}
		});
	};

} (module.exports));