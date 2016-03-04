var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var AccountModel = require("../models/accountmodel");
var N1qlQuery = require('couchbase').N1qlQuery;

function ChatModel() { };

ChatModel.create = function(userId,data, callback) {
    var users = data.users;
    users.push(userId);
    var chatRoom = {
        id: uuid.v4(),
        users: users,
        type:"chat"
    };
    db.insert("chat::" + chatRoom.id, chatRoom, function(error, result) {
        if(error) {
            return callback(error, null);
        }

        return callback(null, chatRoom);
    });
}

ChatModel.getChat = function(chatId,userId, callback) {
    var query = N1qlQuery.fromString(
        "SELECT users.*, chats.id, chats.users " +
        "FROM `" + config.couchbase.bucket + "` AS chats " +
        "UNNEST chats.users AS userstore " +
        "JOIN `" + config.couchbase.bucket + "` users ON KEYS (\"user::\" || userstore) " +
        "WHERE EVERY p IN chats.users SATISFIES $2 IN chats.users  AND users.uid != $2 AND META(chats).id = $1 END"
    );
    db.query(query, ["chat::" + chatId,userId], function(error, result) {
        if(error) {
            console.log(error);
            return callback(error, null);
        }
        var response = [];
        var responseIndex = [];
        result.forEach(function(result,index) {
            var userObj = {
                cover: result.cover,
                photos: result.photos,
                firstname: result.firstname,
                lastname: result.lastname,
                uid: result.uid,
                type: result.type,
                email: result.email
            };
            var i = responseIndex.indexOf(result.id);
            if (i >= 0) {
                response[i].users.push(userObj);
            } else {
                responseIndex.push(result.id);
                response.push({
                    id: result.id,
                    users: [userObj]
                });
            }
        });

        callback(null, response[0]);
    });
}

ChatModel.getAll = function(userId,callback) {
    var statement = "SELECT users.*, chats.id, chats.users " +
        "FROM `" + config.couchbase.bucket +"` AS chats " +
        "UNNEST chats.users AS userstore " +
        "JOIN `" + config.couchbase.bucket + "` users ON KEYS (\"user::\" || userstore) " +
        "WHERE EVERY p IN chats.users SATISFIES $1 IN chats.users  AND users.uid != $1 END";

    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, [userId,"user::" + userId],function(error, results) {
        if(error) {
            console.log(error);
            return callback(error, null);
        }
        var response = [];
        var responseIndex = [];
        results.forEach(function(result,index){
            var userObj = {
                cover: result.cover,
                photos: result.photos,
                firstname: result.firstname,
                lastname:  result.lastname,
                uid:result.uid,
                type:result.type,
                email:result.email
            };
            var i = responseIndex.indexOf(result.id);
            if(i >= 0){
                response[i].users.push(userObj);
            }else{
                responseIndex.push(result.id);
                response.push({
                    id: result.id,
                    users:[userObj]
                });
            }

        });


        callback(null, response);
    });
};

module.exports = ChatModel;
