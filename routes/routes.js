var ChatModel = require("../models/chatmodel");
var passport = require("passport");
var AccountModel = require("../models/accountmodel");
var bodyParser = require("body-parser");

var appRouter = function(app) {



    //facebook
    app.get("/auth/facebook", passport.authenticate("facebook", { scope: 'email'}));
    app.get("/facebook/callback", passport.authenticate("facebook", {successRedirect: "/#/chat"}));

    //users routes

    app.get("/user", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        AccountModel.findByUserId(req.user, function(error, result) {
            res.send({"profile": result});

        });
    });

    app.get("/users", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        AccountModel.findAll(req.user,function(error, result) {
            res.send({"users": result});

        });
    });

    app.get("/user/:id", function(req, res, next) {
        AccountModel.findByUserId(req.params.id, function(error, result) {
            res.send(result);


        });
    });



    //chat routes

    app.get("/chats", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        ChatModel.getAll(req.user, function(error, result) {
            res.send(result);

        });
    });

    app.get("/chat/:id", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        console.log(req.params.id);
        ChatModel.getChat(req.params.id,req.user, function(error, result) {
            res.send(result);

        });
    });


    app.post("/chats", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/");
        }
        ChatModel.create(req.user,req.body, function(error, result) {
            res.send(result);

        });
    });


    //profile routes

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
