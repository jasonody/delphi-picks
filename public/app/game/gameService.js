(function () {
	"use strict";

	var app = angular.module("delphi");
	app.factory("gameService", function ($q, $http) {

		var socket = null;

		var getSocket = function () {

			if (!socket) {
				socket = io.connect("/games");
			}

			socket.removeAllListeners();

			return socket;
		};

		var getAllForRound = function (season, tournament, round) {

			var uri = "/api/games/" + season + "/" + tournament + "/" + round;

			return $http.get(uri, {
				transformResponse: $http.defaults.transformResponse.concat([
					function (data, headersGetter) {
						
						var map = Array.prototype.map;
						var filter = Array.prototype.filter;

						var games = map.call(data.games, function (game) {

							var gamePick = filter.call(data.picks, function (pick) {

								return pick.game === game.game;
							});

							game.pick = 0;
							if (gamePick.length > 0) {
								game.pick = gamePick[0].pick;
							}

							return game;
						});

						return {
							canDraw: data.canDraw,
							games: games
						};
					}
				])
			});
		};

		var updatePick = function (season, tournament, round, game, pick) {

			var deferred = $q.defer();
			var uri = "/api/picks/" + season + "/" + tournament + "/" + round + "/" + game;
			var payload = { "pick": pick };
			
			return $http.post(uri, payload)
			.then(function (response) {
			
				var status = "";
				
				if (response.status === 204) {
					status = "OK";
				}	else if (response.status === 403) {
					status = "GAME_STARTED";
				} else {
					status = "ERROR";
				}
				
				return { 
					message: response.data,
					status: status
				};
			});
		};

		return {
			getSocket: getSocket,
			getAllForRound: getAllForRound,
			updatePick: updatePick
		};
	});

}());