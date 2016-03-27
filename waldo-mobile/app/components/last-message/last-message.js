var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by asqwrd on 2/24/2016.
 */
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
require('rxjs/Rx');
var LastMessage = (function () {
    function LastMessage(http, zone) {
        this.lastMessage = "";
        this.lastUser = {};
        this.http = http;
        this.zone = zone;
    }
    LastMessage.prototype.ngOnInit = function () {
        var _this = this;
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe'
        });
        this.pubnub.history({
            channel: this.chatId,
            count: 100,
            callback: function (m) {
                if (m[0][m[0].length - 1]) {
                    _this.lastMessage = m[0][m[0].length - 1].text;
                    _this.http.get("//localhost:3000/user/" + m[0][m[0].length - 1].userId).map(function (responseData) {
                        var data2 = responseData.json();
                        _this.lastUser = data2[0];
                        return data2;
                    }).subscribe(function (success) {
                        var data = success;
                        _this.lastUser = data[0];
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
        });
        this.pubnub.subscribe({
            channel: this.chatId,
            callback: function (text) { _this.lastMessage = text.text; }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LastMessage.prototype, "chatId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LastMessage.prototype, "userIds", void 0);
    LastMessage = __decorate([
        core_1.Component({
            selector: 'last-message',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'build/components/last-message/last-message.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone])
    ], LastMessage);
    return LastMessage;
})();
exports.LastMessage = LastMessage;
