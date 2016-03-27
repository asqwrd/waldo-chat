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
var home_1 = require("../home/home");
var login_1 = require("../login/login");
var SplashPage = (function () {
    function SplashPage(nav, navParams, http, zone) {
        var _this = this;
        this.nav = nav;
        this.http = http;
        this.profile = [];
        this.chats = [];
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.zone = zone;
        openFB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token
                // and signed request each expire
                var uid = response.authResponse.userID;
                var access_token = response.authResponse.accessToken;
                openFB.api({
                    path: '/me',
                    success: function (data) {
                        var profile = { profile: data };
                        _this.zone.run(function () {
                            _this.http.post('http://192.168.1.223:3000/login/facebook', JSON.stringify(profile), { headers: headers }).subscribe(function (responseData) {
                                _this.profile = [responseData.json().profile];
                                _this.http.get("http://192.168.1.223:3000/chats/" + _this.profile[0].uid).subscribe(function (responseData) {
                                    var data2 = responseData.json();
                                    _this.chats = data2;
                                    console.log(_this.chats);
                                    _this.nav.setRoot(home_1.HomePage, {
                                        profile: _this.profile,
                                        chats: _this.chats,
                                        access_token: access_token
                                    });
                                });
                            });
                        });
                    },
                    params: {
                        fields: ["id", "birthday", "email", "first_name", "gender", "last_name", "picture.type(large)", "cover"]
                    },
                    error: function (err) {
                        openFB.login(function (response) {
                            if (response.status === 'connected') {
                            }
                            else {
                                console.log('User cancelled login or did not fully authorize.');
                            }
                        }, { scope: '' });
                    }
                }, { scope: '' });
            }
            else {
                _this.nav.setRoot(login_1.LoginPage);
            }
        });
    }
    SplashPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/splash/splash.html',
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams, http_1.Http, core_1.NgZone])
    ], SplashPage);
    return SplashPage;
})();
exports.SplashPage = SplashPage;
