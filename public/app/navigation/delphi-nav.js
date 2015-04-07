(function () {
	"use strict";

	var app = angular.module("delphi");
	app.directive("delphiNav", function () {

		var getCssClasses = function (link) {

			var cssClasses = "";
			if (link.isActive) {
				cssClasses = "active";
			}

			return cssClasses;
		};

		return {
			restrict: "E",
			replace: true,
			templateUrl: "/app/navigation/delphi-nav.html",
			controller: function ($scope, $routeParams, tournamentService, roundService) {

				$scope.links = getLinks($routeParams, tournamentService, roundService);
				$scope.getCssClasses = getCssClasses;

				$scope.isCollapsed = true;
				$scope.toggleCollapsed = function () {

					$scope.isCollapsed = !$scope.isCollapsed;
				};
			}
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
			.then(function (data) {

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
			.then(function (data) {

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

} ());
//http://stackoverflow.com/questions/16325557/dynamic-links-in-twitter-bootstrap-navbar-in-angularjs