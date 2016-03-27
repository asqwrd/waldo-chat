var ChatModel = require("../models/chatmodel");
var passport = require("passport");
var AccountModel = require("../models/accountmodel");
var bodyParser = require("body-parser");
var authstrategies = require("../auth/strategies.js");

var appRouter = function(app) {



    //facebook
    app.post("/auth/facebook/token", passport.authenticate("facebook-token", { scope: 'email'}),function(req, res) {
        res.json(req.user);
    });
    app.get("/auth/facebook/token", passport.authenticate("facebook-token", {}),function(req, res) {
        res.json(req.user);
    });

    app.post("/login/facebook",function(req,res,next){
        AccountModel.facebookFindOrCreate(req.body.profile, function(error, user) {
            if(error) {
                console.log(error);
                res.writeHead(404, {
                    'Location': '/'
                });
                return res.end();
            }

            res.json({"profile": user});
        });
    });


   // app.get("/facebook/callback", passport.authenticate("facebook-token", { failureRedirect: "/" }),function(req, res) {
        //res.send(req.user);
    //});

    //users routes


    app.get("/user", function(req, res, next) {
        if(!req.user && !req.query.access_token) {
            res.writeHead(404, {
                'Location': '/'
            });
            return res.end();
        }else if(req.query.access_token == global.access_token){

            AccountModel.findByUserId(req.query.id, function(error, result) {
                res.send({"profile": result});

            });
        }else {
            AccountModel.findByUserId(req.user, function(error, result) {
                res.send({"profile": result});

            });
        }
    });

    app.get("/users", function(req, res, next) {
        if(!req.user) {
            res.writeHead(404, {
                'Location': '/'
            });
            return res.end();
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

    app.get("/chats/:userid", function(req, res, next) {
        ChatModel.getAll(req.params.userid, function (error, result) {
            res.send(result);

        });
    });

    app.get("/chat/:id", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/#/");
        }
        ChatModel.getChat(req.params.id,req.user, function(error, result) {
            res.send(result);

        });
    });


    app.post("/chats", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/#/");
        }
        ChatModel.create(req.user,req.body, function(error, result) {
            res.send(result);

        });
    });


    //profile routes

    app.post("/secure", function(req, res, next) {
        if(!req.user) {
            return res.redirect("/#/");
        }
        AccountModel.updateUser(req.user, req.body, function(error, result) {
            if(!error) {
                res.redirect("/secure");
            }
        })
    });


};

module.exports = appRouter;
