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
var core_1 = require('angular2/core');
var PerfectScrollDirective = (function () {
    function PerfectScrollDirective(el, renderer) {
        this.el = el;
    }
    PerfectScrollDirective.prototype.ngOnInit = function () {
        Ps.initialize(this.el.nativeElement, {
            wheelSpeed: 1,
            wheelPropagation: true,
            suppressScrollX: true
        });
    };
    PerfectScrollDirective = __decorate([
        core_1.Directive({
            selector: '[perfectScroll]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], PerfectScrollDirective);
    return PerfectScrollDirective;
})();
exports.PerfectScrollDirective = PerfectScrollDirective;
