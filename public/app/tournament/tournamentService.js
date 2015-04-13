(function () {
	"use strict";

	var module = angular.module("delphi");
	module.factory("tournamentService", function ($http) {

		var getAllForSeason = function (season) {

			var uri = "/api/tournaments/" + season;

			return $http.get(uri, { cache: true });
		};

		return {
			getAllForSeason: getAllForSeason
		};
	});

}());