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
 * Created by asqwrd on 2/25/2016.
 */
var core_1 = require('angular2/core');
var AvatarInitial = (function () {
    function AvatarInitial() {
    }
    AvatarInitial.prototype.transform = function (value) {
        if (value) {
            return value[0];
        }
    };
    AvatarInitial = __decorate([
        core_1.Pipe({
            name: 'avatarInitial',
        }), 
        __metadata('design:paramtypes', [])
    ], AvatarInitial);
    return AvatarInitial;
})();
exports.AvatarInitial = AvatarInitial;
var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (value, args) {
        // create instance vars to store keys and final output
        var keyArr = Object.keys(value), dataArr = [];
        // loop through the object,
        // pushing values to the return array
        keyArr.forEach(function (key) {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
    };
    ValuesPipe = __decorate([
        core_1.Pipe({
            name: 'values',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], ValuesPipe);
    return ValuesPipe;
})();
exports.ValuesPipe = ValuesPipe;
var NameListPipe = (function () {
    function NameListPipe() {
    }
    NameListPipe.prototype.transform = function (value) {
        // create instance vars to store keys and final output
        var names = "";
        if (value) {
            value.forEach(function (name, index) {
                if (index == value.length - 1) {
                    names += name.firstname;
                }
                else {
                    names += name.firstname + ", ";
                }
            });
        }
        if (names.length > 15) {
            names = names.substring(0, 15) + "...";
        }
        return names;
    };
    NameListPipe = __decorate([
        core_1.Pipe({
            name: 'nameList',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], NameListPipe);
    return NameListPipe;
})();
exports.NameListPipe = NameListPipe;
var SearchArrayPipe = (function () {
    function SearchArrayPipe() {
    }
    SearchArrayPipe.prototype.transform = function (value, args) {
        if (!args[0]) {
            return value;
        }
        else if (value) {
            return value.filter(function (item) {
                for (var key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].indexOf(args[0]) !== -1)) {
                        return true;
                    }
                }
            });
        }
    };
    SearchArrayPipe = __decorate([
        core_1.Pipe({ name: 'search' }), 
        __metadata('design:paramtypes', [])
    ], SearchArrayPipe);
    return SearchArrayPipe;
})();
exports.SearchArrayPipe = SearchArrayPipe;
