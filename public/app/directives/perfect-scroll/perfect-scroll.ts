/**
 * Created by asqwrd on 3/2/2016.
 */


import {Directive, ElementRef, Renderer, Input,OnInit} from 'angular2/core';

declare var Ps:any;
@Directive({
    selector: '[perfectScroll]'
})
export class PerfectScrollDirective implements OnInit{
    el:ElementRef;
    constructor(el: ElementRef, renderer: Renderer) {
        this.el = el;
    }

    ngOnInit() {
        Ps.initialize(this.el.nativeElement,{
            wheelSpeed: 1,
            wheelPropagation: true,
        });
    }

}


