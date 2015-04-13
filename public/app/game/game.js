(function () {
	"use strict";

	var app = angular.module("delphi");
	app.controller("GameController", function ($scope, $routeParams, $route, gameService,
		$interval) {

		var season = $routeParams.season;
		var tournament = $routeParams.tournament;
		var round = $routeParams.round;
		var room = season + "-" + tournament + "-" + round;

		$scope.updatePick = function (game, value) {

			var previousPick = game.pick;
			game.pick = value;

			gameService.updatePick(season, tournament, round, game.game, value)
			.then(function (response) {
				
				if (response.status === "OK") {
					//notify of pick update
				} else {
					game.pick = previousPick;
					
					alert(response.message);
				}
				
				if (response.status === "GAME_STARTED") {
					$route.reload();
				}
			});
		};

		gameService.getAllForRound(season, tournament, round)
		.success(function (data) {

			$scope.games = data.games;
			$scope.canDraw = data.canDraw;

			//Retrieve lastest data for round every 5 minutes
			$interval(function () {
				
				gameService.getAllForRound(season, tournament, round)
				.success(function (data) {

					$scope.games = data.games;
				});
			}, 5 * 60 * 1000);
		});	
	});

	var findGame = function (games, gameId) {

		var filter = Array.prototype.filter;

		var filteredGames = filter.call(games, function (game) {

			return game.game === gameId;
		});

		return filteredGames[0];
	};

}());