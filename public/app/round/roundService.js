(function () {
	"use strict";

	var app = angular.module("delphi");
	app.factory("roundService", function ($http) {

		var getAllForTournament = function (season, tournament) {

			var uri = "/api/rounds/" + season + "/" + tournament;

			return $http.get(uri, { cache: true });
		};

		return {
			getAllForTournament: getAllForTournament
		};
	});

}());