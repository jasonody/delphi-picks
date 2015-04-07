(function (seedDatabase) {
	"use strict";

	var seedData = require("./seedData");

	seedDatabase.execute = function (database) {

		database.getDb(function (err, db) {

			if (err) {
				console.log("Failed to seed database: " + err);
			} else {
				db.games.count(function (err, count) {

					if (err) {
						console.log("Failed to retrive database: " + err);
					} else {
						if (count === 0) {
							seedData.games.forEach(function (item) {

								db.games.insert(item, function (err) {

									if (err) {
										console.log("Failed to insert game: " + err);
									}
								});
							});

							seedData.picks.forEach(function (item) {

								db.picks.insert(item, function (err) {

									if (err) {
										console.log("Failed to insert pick: " + err);
									}
								});
							});

							seedData.tournaments.forEach(function (item) {

								db.tournaments.insert(item, function (err) {

									if (err) {
										console.log("Failed to insert tournament: " + err);
									}
								});
							});

							seedData.rounds.forEach(function (item) {

								db.rounds.insert(item, function (err) {

									if (err) {
										console.log("Failed to insert round: " + err);
									}
								});
							});

							console.log("Database is now seeded.");
						} else {
							console.log("Database already seeded.");
						}
					}
				});
			}
		});
	};

} (module.exports));