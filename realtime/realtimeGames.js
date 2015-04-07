(function (realtimeGames) {
	"use strict";

	//gamesIo.to(round).emit("update", { message: "send to all in room" });
	//socket.to(round).emit("update", { message: "send to all in room but emitter" });
	//socket.emit("update", { message: "send just to emitter" });
	//gamesIo.emit("update", { message: "send to all" });

	var async = require("async");

	realtimeGames.init = function (io) {

		var gamesIo = io.of("/games");
		gamesIo.on("connection", function (socket) {

			socket.on("join round", function (round) {

				socket.join(round);
				console.log(round + " Joined");
			});

			socket.on("leave round", function (round) {

				socket.leave(round);
				console.log(round + " left");
			});

			socket.on("new update", function (data) {

				if (data.password === process.env.ADMIN_PW) {
					var room = data.season + "-" + data.tournament + "-" + data.round;

					gamesIo.to(room).emit("update", {
						game: data.game,
						result: data.result,
						score: data.score
					});
				} else {
					socket.emit("failed update");
				}

			});

			socket.on("new message", function (data) {

				if (data.password === process.env.ADMIN_PW) {
					var room = data.season + "-" + data.tournament + "-" + data.round;

					gamesIo.to(room).emit("message", {
						message: data.message
					});
				} else {
					socket.emit("failed update");
				}
			});

			socket.on("new message-all", function (data) {

				if (data.password === process.env.ADMIN_PW) {
					var room = data.season + "-" + data.tournament + "-" + data.round;

					gamesIo.emit("message", {
						message: data.message
					});
				} else {
					socket.emit("failed update");
				}
			});

			socket.on("start sim", function (round) {
				
				async.series([
					function (next) {
						setTimeout(function () {

							socket.emit("start", { game: 2, score: "0 - 0" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("update", { game: 1, result: 3, score: "1 - 1" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("update", { game: 2, result: 2, score: "0 - 1" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("complete", { game: 1 });
							socket.emit("start", { game: 3, score: "0 - 0" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("update", { game: 3, result: 1, score: "1 - 0" });
							socket.emit("start", { game: 4, score: "0 - 0" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("update", { game: 2, result: 2, score: "0 - 2" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("update", { game: 4, result: 1, score: "1 - 0" });
							next(null, null);
						}, 2000);
					},
					function (next) {
						setTimeout(function () {

							socket.emit("update", { game: 4, result: 3, score: "1 - 1" });
							socket.emit("complete", { game: 2 });
							socket.emit("end sim");
							next(null, null);
						}, 2000);
					}
				]);
			});

			socket.emit("connected");
		});
	};

} (module.exports));