/**
 * Created by asqwrd on 2/23/2016.
 */

var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require("couchbase").N1qlQuery;

function AccountModel() {};
AccountModel.facebookFindOrCreate = function(profile, callback) {
    var query = N1qlQuery.fromString(
        "SELECT users.* " +
        "FROM `" + config.couchbase.bucket + "` AS facebooklogin " +
        "JOIN `" + config.couchbase.bucket + "` AS users ON KEYS (\"user::\" || facebooklogin.uid) " +
        "WHERE META(facebooklogin).id = $1"
    );
    db.query(query, ["facebook::" + profile.id], function(error, result) {
        if(error) {
            return callback(error, null);
        }
        if(result.length <= 0) {
            var userDocument = {
                "type": "user",
                "uid": uuid.v4(),
                "firstname": profile.name.givenName,
                "lastname": profile.name.familyName,
                "email": profile.emails[0].value
            };
            var referenceDocument = {
                "type": "facebook",
                "uid": userDocument.uid
            };
            db.insert("user::" + userDocument.uid, userDocument, function(error, result) {
                if(error) {
                    return callback(error);
                }
                db.insert("facebook::" + profile.id, referenceDocument, function(error, result) {
                    if(error) {
                        return callback(error);
                    }
                    return callback(null, userDocument);
                });
            });
        } else {
            callback(null, result[0]);
        }
    });
}


AccountModel.findByUserId = function(userId, callback) {
    var query = N1qlQuery.fromString(
        "SELECT users.* " +
        "FROM `" + config.couchbase.bucket + "` AS users " +
        "WHERE META(users).id = $1"
    );
    db.query(query, ["user::" + userId], function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result[0]);
    });
}


AccountModel.updateUser = function(userId, profile, callback) {
    db.get("user::" + userId, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        var userDocument = result.value;
        userDocument.firstname = profile.firstname;
        userDocument.lastname = profile.lastname;
        userDocument.email = profile.email;
        db.replace("user::" + userId, userDocument, function(error, result) {
            if(error) {
                return callback(error, null);
            }
            return callback(null, userDocument);
        });
    });
}

module.exports = AccountModel;