(function () {
	"use strict";

	var app = angular.module("delphi");
	app.controller("RoundController", function ($scope, $routeParams, $location, roundService) {

		var season = $routeParams.season;
		var tournament = $routeParams.tournament;

		roundService.getAllForTournament(season, tournament)
		.then(function (data) {

			//check if forwarding to current round's games
			if ($location.search().forward) {
				var filter = Array.prototype.filter;
				var currentRound = filter.call(data.rounds, function (item) {

					return item.isCurrent;
				});

				if (currentRound.length > 0) {
					var uri = "/" + season + "/" + tournament + "/" + currentRound[0].round;
					$location.search("forward", null); //remove query string param
					$location.path(uri);
				}
			} else {
				$scope.rounds = data.rounds.reverse();
			}
		});

		$scope.goToGames = function (round) {

			var uri = "/" + season + "/" + tournament + "/" + round.round;
			$location.path(uri);
		};

		$scope.getIsCurrentCss = function (round) {

			var css = "";
			if (round.isCurrent) {
				css = "btn-success";
			}

			return css;
		};
	});

} ());