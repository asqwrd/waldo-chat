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
var http_1 = require("angular2/http");
var core_1 = require("angular2/core");
var chat_list_1 = require('../../components/chat-list/chat-list');
var avatar_1 = require("../../components/avatar/avatar");
var HomePage = (function () {
    function HomePage(nav, navParams, http, zone) {
        this.nav = nav;
        this.zone = zone;
        this.http = http;
        this.selectedItem = navParams.get('item');
        //this.profile =[];
        //this.chats =  [];
        this.access_token = navParams.get('access_token');
        this.profile = navParams.get('profile');
        this.chats = navParams.get('chats');
        console.log(this.profile);
    }
    HomePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/home/home.html',
            directives: [chat_list_1.ChatList, avatar_1.Avatar]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, http_1.Http, core_1.NgZone])
    ], HomePage);
    return HomePage;
})();
exports.HomePage = HomePage;
