/**
 * Created by asqwrd on 2/26/2016.
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
var common_1 = require('angular2/common');
require('rxjs/Rx');
var last_message_1 = require("../last-message/last-message");
var avatar_1 = require("../avatar/avatar");
var pipes_1 = require("../../libs/pipes");
var event_service_1 = require("../../services/event-service");
var HeaderComponent = (function () {
    function HeaderComponent(http, eventService) {
        var _this = this;
        this.eventService = eventService;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.chat = {};
        this.profile = {};
        this.http = http;
        this.http.get("/user").map(function (responseData) {
            var data = responseData.json();
            _this.profile = data.profile;
            return data.profile;
        }).subscribe(function (success) {
            var data = success;
            _this.profile = data;
        }, function (error) {
            console.log(JSON.stringify(error));
        });
        this.open = eventService.showOverlay();
        //eventService.emitter.subscribe(data => this.compose(data));
        this.eventService.emitter.subscribe(function (data) {
            _this.open = data;
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    }
    HeaderComponent.prototype.ngOnInit = function (http) {
        var _this = this;
        this.chat = {};
        if (this.chatid) {
            this.http.get("/chat/" + this.chatid).map(function (responseData) {
                var data = responseData.json();
                _this.chat = data;
                return data;
            }).subscribe(function (success) {
                var data = success;
                _this.chat = data;
            });
        }
    };
    HeaderComponent.prototype.compose = function () {
        if (this.open == false) {
            this.open = true;
        }
        else {
            this.open = false;
        }
        this.eventService.showCompose_broadcast(this.open);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HeaderComponent.prototype, "chatid", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-component',
            viewProviders: [http_1.HTTP_PROVIDERS],
            pipes: [pipes_1.AvatarInitial, pipes_1.NameListPipe],
            templateUrl: 'build/components/header/header.html',
            directives: [last_message_1.LastMessage, common_1.NgStyle, avatar_1.Avatar],
        }), 
        __metadata('design:paramtypes', [http_1.Http, event_service_1.EventService])
    ], HeaderComponent);
    return HeaderComponent;
})();
exports.HeaderComponent = HeaderComponent;
