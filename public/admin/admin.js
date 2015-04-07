(function () {
    "use strict";

    var AdminController = function ($scope) {

        var socket = io.connect("/games");

        socket.on("failed update", function () {

            alert("failed");
        });

        $scope.message = "";
        $scope.season = "2014";
        $scope.tournament = "1";
        $scope.round = "3";

        $scope.sendUpdate = function () {
            socket.emit("new update", {
                password: "pass-through",
                season: $scope.season,
                tournament: $scope.tournament,
                round: $scope.round,
                game: 1,
                result: 2,
                score: "1 - 2"
            });
        };

        $scope.sendMessage = function () {
            socket.emit("new message", {
                password: "pass-through",
                season: $scope.season,
                tournament: $scope.tournament,
                round: $scope.round,
                message: $scope.message
            });
        };

        $scope.sendMessageAll = function () {
            socket.emit("new message-all", {
                password: "pass-through",
                message: $scope.message
            });
        };
    };

    var app = angular.module("delphi-admin");
    app.controller("AdminController", AdminController);

} ());