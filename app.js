var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var config = require("./config");
var app = express();


var server = require("http").Server(app);
//var io = require("socket.io").listen(server);

//app.set("views", path.join(__dirname, "views"));
//
// app.set("view engine", "jade");

app.use(session({ secret: "wole" }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(__dirname + "/node_modules/"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

var routes = require("./routes/routes.js")(app);
var ChatModel = require("./models/chatmodel.js");
var authstrategies = require("./auth/strategies.js");



server.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
