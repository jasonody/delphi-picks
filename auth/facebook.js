(function (facebook) {
	"use strict";

	var FacebookStrategy = require("passport-facebook").Strategy;

	facebook.init = function (router, passport) {
		passport.use(new FacebookStrategy({
			clientID: process.env.FB_APP_ID,
			clientSecret: process.env.FB_APP_SECRET,
			callbackURL: process.env.SITE_URL + "auth/facebook/callback"
		}, function (accessToken, refreshToken, profile, done) {

			var user = {
				id: profile.id,
				username: profile.username || null,
				displayName: profile.displayName || null,
				name: {
					familyName: profile.name.familyName || null,
					givenName: profile.name.givenName || null,
					middleName: profile.name.middleName || null
				},
				gender: profile.gender || null,
				profileUrl: profile.profileUrl || null,
				provider: profile.provider
			};

			done(null, user);
		}));

		router.get("/auth/facebook", passport.authenticate("facebook"));

		router.get("/auth/facebook/callback",
            passport.authenticate("facebook", {
            	successRedirect: "/",
            	failureRedirect: "/login"
            }
		));
	};

} (module.exports));