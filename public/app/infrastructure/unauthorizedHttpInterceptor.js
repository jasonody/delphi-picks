(function () {
	"use strict";

	var app = angular.module("delphi");
	app.factory("unauthorizedHttpInterceptor", function ($q, $window) {

		var response = function (response) {

			if (response.status === 401) {
				$location.path("/login");
			} else {
				return response;
			}
		};

		var responseError = function (rejection) {

			if (rejection.status === 401) {
				$window.location.href = "/login";
			}

			return rejection;
		};

		return {
			response: response,
			responseError: responseError
		};
	});

} ());