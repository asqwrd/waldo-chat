/**
 * Created by asqwrd on 2/23/2016.
 */
var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require("../config");
var AccountModel = require("../models/accountmodel");

passport.use(new FacebookStrategy({
    clientID: config.facebook.client_id,
    clientSecret: config.facebook.client_secret,
    callbackURL: config.facebook.callback_url
}, function(accessToken, refreshToken, profile, done) {
    AccountModel.facebookFindOrCreate(profile, function(error, user) {
        if(error) {
            return done(error);
        }
        done(null, user);
    });
}));
