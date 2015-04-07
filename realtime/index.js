(function (realtimeUpdates) {
	"use strict";

	var socketio = require("socket.io");
	var realtimeGames = require("./realtimeGames");

	realtimeUpdates.init = function (server) {

		var io = socketio.listen(server);

		realtimeGames.init(io);
	};

} (module.exports));