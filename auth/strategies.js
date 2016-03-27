/**
 * Created by asqwrd on 2/23/2016.
 */
var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var config = require("../config");
var AccountModel = require("../models/accountmodel");
global.access_token = '';

passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.client_id,
    clientSecret: config.facebook.client_secret,
    callbackURL: config.facebook.callback_url,
    profileFields: config.facebook.profileFields
}, function(accessToken, refreshToken, profile, done) {
    global.access_token = accessToken;
    //console.log(profile);
    AccountModel.facebookFindOrCreate(profile, function(error, user) {
        if(error) {
            return done(error);
        }
        done(null, user);
    });
}));




