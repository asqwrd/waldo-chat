/**
 * Created by asqwrd on 3/3/2016.
 */
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
require('rxjs/Rx');
var Avatar = (function () {
    function Avatar(http) {
        //this.message = "";
    }
    Avatar.prototype.ngOnInit = function () {
    };
    Avatar.prototype.ngAfterViewInit = function () {
    };
    Avatar.prototype.keys = function (array) {
        return Object.keys(array);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Avatar.prototype, "profile", void 0);
    Avatar = __decorate([
        core_1.Component({
            selector: 'avatar',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'build/components/avatar/avatar.html',
            pipes: [pipes_1.AvatarInitial],
            directives: []
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Avatar);
    return Avatar;
})();
exports.Avatar = Avatar;
