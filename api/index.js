(function (api) {
	"use strict";

	var tournamentService = require("./tournamentService");
	var roundService = require("./roundService");
	var gameService = require("./gameService");
	var pickService = require("./pickService");
	var leaderboardService = require("./leaderboardService");

	api.init = function (router, auth, data, sqlapiClient) {

		tournamentService.init(router, auth, data);
		roundService.init(router, auth, data);
		gameService.init(router, auth, data);
		pickService.init(router, auth, data, sqlapiClient);
		leaderboardService.init(router, auth, sqlapiClient);
	};

} (module.exports));