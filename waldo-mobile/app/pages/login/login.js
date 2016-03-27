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
 * Created by asqwrd on 2/23/2016.
 */
var ionic_angular_1 = require('ionic-angular');
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var splash_1 = require("../splash/splash");
var LoginPage = (function () {
    function LoginPage(nav, navParams, http, zone) {
        this.nav = nav;
        this.http = http;
        this.zone = zone;
    }
    LoginPage.prototype.login = function (event) {
        var _this = this;
        event.stopPropagation();
        this.zone.run(function () {
            openFB.login(function (response) {
                if (response.status === 'connected') {
                    console.log('hi');
                    setTimeout(function () {
                        _this.nav.setRoot(splash_1.SplashPage, {
                            from_login: true,
                        });
                    }, 1000);
                }
                else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'public_profile' });
        });
    };
    LoginPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/login/login.html',
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, http_1.Http, core_1.NgZone])
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
