(function () {
	"use strict";

	angular.module("delphi", [
		"ngRoute", 
		"ui.bootstrap"
	]);

	angular.module("delphi")
	.config(function ($routeProvider, $httpProvider) {

		$routeProvider
		.when("/_=_", { //Facebook appends this to the callback url unfortunately 
			redirectTo: "/"
		})
		.when("/:season", {
			templateUrl: "tournament/tournament.html",
			controller: "TournamentController",
			controllerAs: "vm"
		})
		.when("/:season/:tournament", {
			templateUrl: "round/round.html",
			controller: "RoundController",
			controllerAs: "vm"
		})
		.when("/:season/:tournament/:round", {
			templateUrl: "game/game.html",
			controller: "GameController",
			controllerAs: "vm"
		})
		.otherwise({
			redirectTo: "/2014"
		});

		$httpProvider.interceptors.push("unauthorizedHttpInterceptor");
	});

}());