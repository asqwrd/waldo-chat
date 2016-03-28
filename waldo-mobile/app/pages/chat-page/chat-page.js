var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var messages_1 = require('../../components/messages/messages');
var avatar_1 = require('../../components/avatar/avatar');
var pipes_1 = require('../../libs/pipes');
require('rxjs/Rx');
var ChatPage = (function () {
    function ChatPage(http, params) {
        var _this = this;
        this.params = params;
        this.http = http;
        this.messages = [];
        this.sending = false;
        this.whotyping = "";
        this.access_token = this.params.get('access_token');
        this.chat = this.params.get('chat');
        this.chatBox = "";
        this.profile = this.params.get('profile');
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe',
            uuid: this.profile[0].uid
        });
        this.pubnub.history({
            channel: this.params.get('chatId'),
            count: 20,
            callback: function (m) {
                _this.messages = m[0];
                setTimeout(function () {
                    _this.list.nativeElement.scrollTop = _this.list.nativeElement.scrollHeight;
                }, 1000);
            }
        });
        this.pubnub.subscribe({
            channel: this.params.get('chatId'),
            presence: function (text) {
                if ((text.uuid !== _this.profile[0].uid) && (text.data && text.data.isTyping == true)) {
                    _this.whotyping = " " + text.data.full_name + " is typing";
                }
                else {
                    _this.whotyping = "";
                }
            },
            callback: function (text) {
                _this.messages.push(text);
                _this.sending = true;
                _this.pubnub.state({
                    channel: _this.params.get('chatId'),
                    uuid: _this.profile[0].uid,
                    state: { "full_name": _this.profile[0].firstname, isTyping: false },
                    callback: function (m) {
                        //console.log(JSON.stringify(m))
                    }
                });
                setTimeout(function () {
                    _this.list.nativeElement.scrollTop = _this.list.nativeElement.scrollHeight;
                    _this.sending = false;
                }, 1000);
            }
        });
    }
    ChatPage.prototype.ngOnInit = function () {
        this.chatId = this.params.get('chatId');
    };
    ChatPage.prototype.ngAfterViewInit = function () {
    };
    ChatPage.prototype.typing = function (evt) {
        if (this.chatBox.trim().length > 0) {
            this.pubnub.state({
                channel: this.params.get('chatId'),
                uuid: this.profile[0].uid,
                state: { "full_name": this.profile[0].firstname, isTyping: true },
                callback: function (m) {
                    //console.log(JSON.stringify(m))
                }
            });
        }
        else {
            this.pubnub.state({
                channel: this.params.get('chatId'),
                uuid: this.profile[0].uid,
                state: { "full_name": this.profile[0].firstname, isTyping: false },
                callback: function (m) {
                    //console.log(JSON.stringify(m))
                }
            });
        }
    };
    ChatPage.prototype.send = function (message, userId, container) {
        var _this = this;
        var messageObj = {
            channel: this.params.get('chatId'),
            presence: { isTypying: true },
            message: { text: message, userId: userId },
            callback: function (m) {
                _this.chatBox = "";
            }
        };
        if (message && message != "") {
            this.pubnub.publish(messageObj);
        }
        this.chatBox = "";
    };
    __decorate([
        core_1.ViewChild('messagelist'), 
        __metadata('design:type', Object)
    ], ChatPage.prototype, "list", void 0);
    ChatPage = __decorate([
        ionic_angular_1.Page({
            selector: 'chat-page',
            templateUrl: 'build/pages/chat-page/chat-page.html',
            directives: [messages_1.Message, avatar_1.Avatar],
            pipes: [pipes_1.NameListPipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http, ionic_angular_1.NavParams])
    ], ChatPage);
    return ChatPage;
})();
exports.ChatPage = ChatPage;
