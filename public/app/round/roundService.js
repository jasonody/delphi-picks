(function () {
	"use strict";

	var app = angular.module("delphi");
	app.factory("roundService", function ($http, $q) {

		var getAllForTournament = function (season, tournament) {

			var deferred = $q.defer();
			var uri = "/api/rounds/" + season + "/" + tournament;

			$http.get(uri, { cache: true })
			.success(function (data) {

				deferred.resolve(data);
			})
			.error(function (data, status) {

				deferred.reject(status);
			});

			return deferred.promise;
		};

		return {
			getAllForTournament: getAllForTournament
		};
	});

} ());