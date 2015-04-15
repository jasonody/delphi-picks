(function () {
	"use strict";

	angular.module("delphi")
	.directive("delphiGame", function () {

		var getCssClasses = function (game, value, canDraw) {

			var classes = [];

			//Button size
			if (canDraw) {
				classes.push("btn-game-sm");
			} else {
				classes.push("btn-game-lg");
			}

			//Hide "Draw" button if cannot draw
			if (!canDraw && value === 3) {
				classes.push("hide");
			}

			//Depressed selected button
			if (game.pick === value) {
				classes.push("active");
			}

			//Set background color of button
			if (game.hasStarted && game.pick === value) {
				if (game.pick === game.result) {
					classes.push("btn-success");
				} else {
					classes.push("btn-danger");
				}
			} else {
				classes.push("btn-default");
			}

			//Highlight correct button
			if (game.result === value) {
				classes.push("btn-game-bold");
			}

			var out = classes.join(" ");

			return out;
		};

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

				this.getCssClasses = getCssClasses;
				this.getScore = getScore;
			},
			controllerAs: "delphiGameVm"
		};
	});

}());