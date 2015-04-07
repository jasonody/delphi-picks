(function (database) {
	"use strict";

	var mongodb = require("mongodb");
	var mongoUrl = process.env.MONGODB;
	var theDb = null;

	database.getDb = function (next) {

		if (!theDb) {
			mongodb.MongoClient.connect(mongoUrl, function (err, db) {

				if (err) {
					next(err, null);
				} else {
					theDb = {
						db: db,
						tournaments: db.collection("tournaments"),
						rounds: db.collection("rounds"),
						games: db.collection("games"),
						picks: db.collection("picks"),
						users: db.collection("users")
					};

					next(null, theDb);
				}
			});
		} else {
			next(null, theDb);
		}
	};

} (module.exports));