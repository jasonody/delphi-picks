(function (data) {
	"use strict";

	var database = require("./database");
	var seedDatabase = require("./seedDatabase");
	var tournaments = require("./tournaments");
	var rounds = require("./rounds");
	var games = require("./games");
	var picks = require("./picks");
	var users = require("./users");

	//seedDatabase.execute(database);
	tournaments.init(database);
	rounds.init(database);
	games.init(database);
	picks.init(database);
	users.init(database);

	data.tournaments = tournaments;
	data.games = games;
	data.picks = picks;
	data.rounds = rounds;
	data.users = users;

} (module.exports));