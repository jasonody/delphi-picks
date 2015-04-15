(function () {
	"use strict";

	angular.module("delphi")
	.controller("TournamentController", function ($routeParams, $location, tournamentService) {

		var self = this;
		var season = $routeParams.season;

		tournamentService.getAllForSeason(season)
		.success(function (data) {

			self.tournaments = data.tournaments;
		});

		self.goToGames = function (tournament) {

			var uri = "/" + season + "/" + tournament.id;
			$location.search("forward"); //add query string param
			$location.path(uri);
		};
	});

}());