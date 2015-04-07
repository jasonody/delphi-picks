(function (users) {
	"use strict";

	var database = null;

	users.init = function (db) {

		database = db;
	};

	users.update = function (user) {

		database.getDb(function (err, db) {

			if (err) {
				console.dir(err);
			} else {
				var criteria = {
					id: user.id,
					provider: user.provider
				};

				user.lastVisit = (new Date()).toUTCString();

				db.users.update(criteria, user, { upsert: true },
					function (err, result) {

						if (err) {
							console.log("Unable to update user: " + err);
						}
					}
				);
			}
		});
	};

} (module.exports));