(function () {
	"use strict";

	var app = angular.module("delphi");
	app.controller("TournamentController", function ($scope, $rootScope, $routeParams, $location, tournamentService) {

		var season = $routeParams.season;

		tournamentService.getAllForSeason(season)
		.then(function (data) {

			$scope.tournaments = data.tournaments;
		});

		$scope.goToGames = function (tournament) {

			var uri = "/" + season + "/" + tournament.id;
			$location.search("forward"); //add query string param
			$location.path(uri);
		};
	});

} ());