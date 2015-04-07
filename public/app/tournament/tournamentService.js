(function () {
	"use strict";

	var module = angular.module("delphi");
	module.factory("tournamentService", function ($http, $q) {

		var getAllForSeason = function (season) {

			var deferred = $q.defer();
			var uri = "/api/tournaments/" + season;

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
			getAllForSeason: getAllForSeason
		};
	});

} ());