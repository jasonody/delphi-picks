(function () {
	"use strict";

	angular.module("delphi")
	.directive("delphiGame", function () {

		var getScore = function (game) {

			var score = "";

			if (game.hasStarted) {
				score = "(" + game.score + ")";
			}
			if (game.isComplete) {
				score = "(" + game.score + " FT)";
			}

			return score;
		};

		return {
			restrict: "E",
			replace: true,
			templateUrl: "/app/game/delphi-game.html",
			scope: {
				game: "=",
				canDraw: "@",
				pickHome: "&",
				pickDraw: "&",
				pickAway: "&"
			},
			controller: function () {

				var vm = this;
				
				vm.getScore = getScore;
				
				vm.styles = function (game, value, canDraw) {
					
					return {
						'btn': true,
						'btn-lg': true,
						'btn-game-sm': canDraw,
						'btn-game-lg': !canDraw,
						'hide': (!canDraw && value === 3),
						'active': (game.pick === value),
						'btn-success': (game.hasStarted && game.pick === value && game.pick === game.result),
						'btn-danger': (game.hasStarted && game.pick === value && game.pick !== game.result),
						'btn-default': (!game.hasStarted && game.pick === value) || (!game.hasStarted && game.pick !== value) || (game.hasStarted && game.pick !== value),
						'btn-game-bold': (game.result === value)
					};
				};
			},
			controllerAs: "vm"
		};
	});

}());