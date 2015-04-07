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

			var deferred = $q.defer();
			var uri = "/api/games/" + season + "/" + tournament + "/" + round;

			$http.get(uri)
			.success(function (data) {

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

				deferred.resolve({
					canDraw: data.canDraw,
					games: games
				});
			})
			.error(function (data, status) {

				deferred.reject(data);
			});

			return deferred.promise;
		};

		var updatePick = function (season, tournament, round, game, pick) {

			var deferred = $q.defer();
			var uri = "/api/picks/" + season + "/" + tournament + "/" + round + "/" + game;
			var payload = { "pick": pick };

			$http.post(uri, payload)
			.success(function (data, status) {

				if (status === 403) {
					deferred.reject({
						status: status,
						data: data
					});
				} else {
					deferred.resolve(data);
				}
			})
			.error(function (data, status) {

				deferred.reject({
					status: status,
					data: data
				});
			});

			return deferred.promise;
		};

		return {
			getSocket: getSocket,
			getAllForRound: getAllForRound,
			updatePick: updatePick
		};
	});

} ());