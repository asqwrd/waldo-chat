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
 * Created by asqwrd on 2/26/2016.
 */
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var event_service_1 = require('../../services/event-service');
require('rxjs/Rx');
var pipes_1 = require("../../libs/pipes");
var avatar_1 = require('../../components/avatar/avatar');
var perfect_scroll_1 = require('../../directives/perfect-scroll/perfect-scroll');
var SearchOverlay = (function () {
    function SearchOverlay(http, eventService, router) {
        var _this = this;
        this.users = [];
        this.router = router;
        this.eventService = eventService;
        this.showCompose = eventService.showOverlay();
        this.selectedUsersId = [];
        this.selectedUsers = [];
        this.http = http;
        this.http.get("/users").map(function (responseData) {
            var data = responseData.json();
            _this.users = data.users;
            return data.users;
        }).subscribe(function (success) {
            var data = success;
            _this.users = data;
        }, function (error) {
            console.log(JSON.stringify(error));
        });
        this.eventService.emitter.subscribe(function (data) {
            _this.showCompose = data;
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    }
    SearchOverlay.prototype.composeToggle = function () {
        if (this.showCompose == true) {
            this.showCompose = false;
        }
        else {
            this.showCompose = true;
        }
        this.eventService.showCompose_broadcast(this.showCompose);
    };
    SearchOverlay.prototype.ngOnInit = function () {
    };
    SearchOverlay.prototype.addToSelected = function (user, zone) {
        if (this.selectedUsersId.indexOf(user.uid) < 0) {
            this.selectedUsersId.push(user.uid);
            //this.zone.run(() => {
            this.selectedUsers[user.uid] = user;
            //});
            user.selected = true;
        }
        else {
            var i = this.selectedUsersId.indexOf(user.uid);
            this.selectedUsersId.splice(i, 1);
            delete this.selectedUsers[user.uid];
            user.selected = false;
        }
    };
    SearchOverlay.prototype.createChatRoom = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.composeToggle();
        var data = { "users": this.selectedUsersId };
        this.http.post("/chats", JSON.stringify(data), { headers: headers }).subscribe(function (responseData) {
            var data = responseData.json();
            _this.router.navigate(['ChatPage', { chatId: data.id }]);
            _this.selectedUsersId = [];
            _this.selectedUsers = [];
            _this.users.forEach(function (user, index) {
                if (user.selected) {
                    user.selected = false;
                }
            });
            //return data.users;
        });
    };
    SearchOverlay = __decorate([
        core_1.Component({
            selector: 'search',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'build/components/search/search.html',
            directives: [common_1.NgStyle, common_1.NgFor, avatar_1.Avatar, perfect_scroll_1.PerfectScrollDirective],
            pipes: [pipes_1.AvatarInitial, pipes_1.ValuesPipe, pipes_1.SearchArrayPipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http, event_service_1.EventService, router_1.Router])
    ], SearchOverlay);
    return SearchOverlay;
})();
exports.SearchOverlay = SearchOverlay;
