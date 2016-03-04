/**
 * Created by asqwrd on 2/28/2016.
 */


import {Component, View,EventEmitter,Output} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";


export class EventService {
    public emitter: EventEmitter<any>;
    private open:any;

    constructor() {
        this.emitter = new EventEmitter();
        this.open = false;
    }

    public showOverlay(){
        return this.open;
    }


    public showCompose_broadcast(data:any) {
        this.open = data;
        this.emitter.emit(data);
    }
}
