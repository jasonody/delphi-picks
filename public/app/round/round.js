(function () {
	"use strict";

	angular.module("delphi")
	.controller("RoundController", function ($routeParams, $location, roundService) {

		var self = this;
		var season = $routeParams.season;
		var tournament = $routeParams.tournament;

		roundService.getAllForTournament(season, tournament)
		.success(function (data) {

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
				self.rounds = data.rounds.reverse();
			}
		});

		self.goToGames = function (round) {

			var uri = "/" + season + "/" + tournament + "/" + round.round;
			$location.path(uri);
		};

		self.getIsCurrentCss = function (round) {

			var css = "";
			if (round.isCurrent) {
				css = "btn-success";
			}

			return css;
		};
	});

}());