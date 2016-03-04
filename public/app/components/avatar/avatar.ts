/**
 * Created by asqwrd on 3/3/2016.
 */
/**
 * Created by asqwrd on 3/2/2016.
 */

import {Component, View,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {AvatarInitial} from "../../libs/pipes";

import 'rxjs/Rx';


declare var PUBNUB:any;

@Component({
    selector: 'avatar',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/components/avatar/avatar.html',
    pipes:[AvatarInitial]
})

export class Avatar {

    @Input() profile: any;
    http:Http;


    constructor(http: Http) {
        //this.message = "";
        this.http = http;

    }

    ngOnInit(){

    }

}


