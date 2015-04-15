(function () {
	"use strict";

	angular.module("delphi")
	.factory("tournamentService", function ($http) {

		var getAllForSeason = function (season) {

			var uri = "/api/tournaments/" + season;

			return $http.get(uri, { cache: true });
		};

		return {
			getAllForSeason: getAllForSeason
		};
	});

}());