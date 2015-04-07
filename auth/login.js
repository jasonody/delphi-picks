(function (login) {
    "use strict";

    login.init = function (router) {

        router.get("/login", function (req, res) {

            res.redirect("/auth/facebook");
        });
    };

} (module.exports));