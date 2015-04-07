(function (scrape) {
	"use strict";

	var inserter = require("./inserter");
	var updater = require("./updater");

	scrape.init = function (router, data, sqlapiClient) {

		if (process.env.ENV === "DEV") {
			inserter.init(router, data);
		}

		updater.init(router, data, sqlapiClient);
	};

} (module.exports));