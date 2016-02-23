var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;

function ChatModel() { };

ChatModel.create = function(data, callback) {
    var chatRoom = {
        id: uuid.v4(),
        users: data.users
    };
    db.insert("chat::" + chatRoom.id, chatRoom, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        return callback(null, result);
    });
}

ChatModel.getAll = function(userId,callback) {
    var statement = "SELECT id, users " +
                    "FROM `" + config.couchbase.bucket + "` WHERE ANY user in "+ config.couchbase.bucket + ".users SATISFIES user ==" + userId + "END";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

module.exports = ChatModel;
