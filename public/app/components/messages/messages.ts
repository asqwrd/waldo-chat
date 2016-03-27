/**
 * Created by asqwrd on 3/2/2016.
 */

import {Component, View,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {AvatarInitial} from "../../libs/pipes";
import {Avatar} from "../../components/avatar/avatar";

import 'rxjs/Rx';


declare var PUBNUB:any;

@Component({
    selector: 'message',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/components/messages/messages.html',
    pipes:[AvatarInitial],
    directives:[Avatar]
})

export class Message {

    pubnub: any;
    @Input() message: any;
    @Input() userId: any;
    user:Object;
    http:Http;


    constructor(http: Http) {
        //this.message = "";
        this.user ={};
        this.http = http;

    }

    ngOnInit(){

        if(this.userId) {
            this.http.get("/user/" + this.userId).map((responseData) => {
                var data = responseData.json();
                this.user = data;
                return data;
            }).subscribe((success) => {
                var data = success;
                this.user = data;
            });
        }
    }

}


