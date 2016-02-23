var ChatModel = require("../models/chatmodel");
var passport = require("passport");
var AccountModel = require("../models/accountmodel");

var appRouter = function(app) {

    app.get("/fetch", function(req, res) {
        ChatModel.getAll(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            return res.send(result);
        });
    });

    app.get("/auth/facebook", passport.authenticate("facebook"));
    app.get("/facebook/callback", passport.authenticate("facebook", {successRedirect: "/secure"}));

    app.get("/secure", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        AccountModel.findByUserId(req.user, function(error, result) {
            res.render("secure", {"profile": result});
        });
    });

    app.post("/secure", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        AccountModel.updateUser(req.user, req.body, function(error, result) {
            if(!error) {
                res.redirect("/secure");
            }
        })
    });


};

module.exports = appRouter;
