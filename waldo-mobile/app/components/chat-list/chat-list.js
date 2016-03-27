/**
 * Created by asqwrd on 2/24/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var ionic_angular_1 = require('ionic-angular');
var http_1 = require("angular2/http");
var common_1 = require('angular2/common');
var last_message_1 = require("../last-message/last-message");
var avatar_1 = require("../avatar/avatar");
var pipes_1 = require("../../libs/pipes");
var chat_page_1 = require('../../pages/chat-page/chat-page');
var ChatList = (function () {
    function ChatList(http, params, nav, zone) {
        this.chats = [];
        this.nav = nav;
        this.http = http;
        this.params = params;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.profile = this.params.get('profile');
    }
    ChatList.prototype.ngOnInit = function () {
        console.log(this.chats);
    };
    ChatList.prototype.startChat = function (chatId, chat) {
        //this.router.navigate(['ChatPage',{chatId: chatId}]);
        this.nav.push(chat_page_1.ChatPage, {
            chatId: chatId,
            profile: this.profile,
            access_token: this.access_token,
            chat: chat
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChatList.prototype, "chats", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChatList.prototype, "access_token", void 0);
    ChatList = __decorate([
        core_1.Component({
            selector: 'chat-list',
            viewProviders: [http_1.HTTP_PROVIDERS],
            pipes: [pipes_1.AvatarInitial, pipes_1.NameListPipe],
            templateUrl: 'build/components/chat-list/chat-list.html',
            directives: [last_message_1.LastMessage, common_1.NgStyle, avatar_1.Avatar]
        }), 
        __metadata('design:paramtypes', [http_1.Http, ionic_angular_1.NavParams, ionic_angular_1.NavController, core_1.NgZone])
    ], ChatList);
    return ChatList;
})();
exports.ChatList = ChatList;
