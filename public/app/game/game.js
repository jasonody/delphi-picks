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
			.then(function (data, status) {
				//do nothing
			}, function (data) {

				game.pick = previousPick;

				if (data.status === 403) {
					alert(data.data);

					$route.reload();
				}
			});
		};

		gameService.getAllForRound(season, tournament, round)
		.then(function (data) {

			$scope.games = data.games;
			$scope.canDraw = data.canDraw;

			$interval(function () {
				
				gameService.getAllForRound(season, tournament, round)
				.then(function (data) {

					$scope.games = data.games;
				});
			}, 5 * 60 * 1000);
		});	
	});

	var getAllGamesForRound = function (season, tournament, round, $scope, 
		gameService, $timeout) {

		gameService.getAllForRound(season, tournament, round)
		.then(function (data) {

			$scope.games = data.games;
			$scope.canDraw = data.canDraw;

			$timeout(getAllGamesForRound(season, tournament, round, $scope, gameService, 
				$timeout), 1000);
		});
	};

	var findGame = function (games, gameId) {

		var filter = Array.prototype.filter;

		var filteredGames = filter.call(games, function (game) {

			return game.game === gameId;
		});

		return filteredGames[0];
	};

} ());