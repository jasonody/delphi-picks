(function () {
	"use strict";

	var app = angular.module("delphi", ["ngRoute", "ui.bootstrap"]);

	app.config(function ($routeProvider, $httpProvider) {

		$routeProvider
		.when("/_=_", { //Facebook appends this to the callback url unfortunately 
			redirectTo: "/"
		})
		.when("/:season", {
			templateUrl: "tournament/tournament.html",
			controller: "TournamentController"
		})
		.when("/:season/:tournament", {
			templateUrl: "round/round.html",
			controller: "RoundController"
		})
		.when("/:season/:tournament/:round", {
			templateUrl: "game/game.html",
			controller: "GameController"
		})
		.otherwise({
			redirectTo: "/2014"
		});

		$httpProvider.interceptors.push("unauthorizedHttpInterceptor");
	});

} ());