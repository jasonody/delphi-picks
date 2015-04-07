(function () {
	"use strict";

	var app = angular.module("delphi");
	app.controller("GameController", function ($scope, $routeParams, $route, gameService) {

		var season = $routeParams.season;
		var tournament = $routeParams.tournament;
		var round = $routeParams.round;
		var room = season + "-" + tournament + "-" + round;

		var socket = gameService.getSocket();

		socket.on("start", function (data) {
			var game = findGame($scope.games, data.game);
			game.hasStarted = true;
			game.score = data.score;
			game.result = 3;
			$scope.$apply();
		});

		socket.on("complete", function (data) {
			var game = findGame($scope.games, data.game);
			game.isComplete = true;
			$scope.$apply();
		});

		socket.on("update", function (data) {

			var game = findGame($scope.games, data.game);
			game.result = data.result;
			game.score = data.score;
			$scope.$apply();
		});

		socket.on("message", function (data) {

			alert(data.message);
		});

		$scope.$on("$routeChangeStart", function (event) {

			socket.emit("leave round", room);
		});

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

			//Join room for live updates
			socket.emit("join round", room);
		});

		//Real time simulation
		$scope.simInProgess = false;
		$scope.startSimulation = function () {

			socket.emit("start sim", room);
			$scope.simInProgress = true;
		};
		socket.on("end sim", function () {

			alert("Simulation finished.");
			$scope.simInProgress = false;
			$scope.$apply();
		});
	});

	var findGame = function (games, gameId) {

		var filter = Array.prototype.filter;

		var filteredGames = filter.call(games, function (game) {

			return game.game === gameId;
		});

		return filteredGames[0];
	};

} ());