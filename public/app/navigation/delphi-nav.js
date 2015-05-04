(function () {
	"use strict";
	
	//http://stackoverflow.com/questions/16325557/dynamic-links-in-twitter-bootstrap-navbar-in-angularjs

	var app = angular.module("delphi");
	app.directive("delphiNav", function () {

		return {
			restrict: "E",
			replace: true,
			templateUrl: "/app/navigation/delphi-nav.html",
			controller: function ($routeParams, tournamentService, roundService) {

				var self = this;
				self.links = getLinks($routeParams, tournamentService, roundService);

				self.isCollapsed = true;
				self.toggleCollapsed = function () {

					self.isCollapsed = !self.isCollapsed;
				};
			},
			controllerAs: "navVm"
		};
	});

	var getLinks = function ($routeParams, tournamentService, roundService) {

		var season = $routeParams.season;
		var tournament = $routeParams.tournament;
		var round = $routeParams.round;
		var filter = Array.prototype.filter;

		var links = [{
			text: season,
			url: "#/" + season,
			isActive: false
		}];

		if (tournament) {
			var roundLink = {
				text: "",
				url: "#/" + season + "/" + tournament,
				isActive: false
			};
			links.push(roundLink);

			tournamentService.getAllForSeason(season)
			.success(function (data) {

				var selectedTournament = filter.call(data.tournaments, function (item) {

					return item.id === Number(tournament);
				});

				if (selectedTournament.length > 0) {
					roundLink.text = selectedTournament[0].name;
				}
			});
		}

		if (round) {
			var gameLink = {
				text: "",
				url: "#/" + season + "/" + tournament + "/" + round,
				isActive: false
			};
			links.push(gameLink);

			roundService.getAllForTournament(season, tournament)
			.success(function (data) {

				var selectedRound = filter.call(data.rounds, function (item) {

					return item.round === Number(round);
				});

				if (selectedRound.length > 0) {
					gameLink.text = selectedRound[0].name;
				}
			});
		}

		links[links.length - 1].isActive = true;

		return links;
	};

}());