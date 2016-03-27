/**
 * Created by asqwrd on 3/2/2016.
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
var http_1 = require("angular2/http");
var pipes_1 = require("../../libs/pipes");
var avatar_1 = require("../../components/avatar/avatar");
require('rxjs/Rx');
var Message = (function () {
    function Message(http) {
        //this.message = "";
        this.user = {};
        this.http = http;
    }
    Message.prototype.ngOnInit = function () {
        var _this = this;
        if (this.userId) {
            this.http.get("//localhost:3000/user/" + this.userId + "?access_token=" + this.access_token).map(function (responseData) {
                var data = responseData.json();
                _this.user = data;
                return data;
            }).subscribe(function (success) {
                var data = success;
                _this.user = data;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Message.prototype, "message", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Message.prototype, "userId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Message.prototype, "access_token", void 0);
    Message = __decorate([
        core_1.Component({
            selector: 'message',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'build/components/messages/messages.html',
            pipes: [pipes_1.AvatarInitial],
            directives: [avatar_1.Avatar]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Message);
    return Message;
})();
exports.Message = Message;
