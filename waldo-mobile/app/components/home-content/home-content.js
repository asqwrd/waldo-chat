/**
 * Created by asqwrd on 2/25/2016.
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
require('rxjs/Rx');
var header_1 = require('../../components/header/header');
var HomeContent = (function () {
    function HomeContent(http) {
        var _this = this;
        this.profile = {};
        this.http = http;
        this.profile = {};
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
    }
    HomeContent = __decorate([
        core_1.Component({
            selector: 'home-content',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'app/components/home-content/home-content.html',
            directives: [header_1.HeaderComponent]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeContent);
    return HomeContent;
})();
exports.HomeContent = HomeContent;
