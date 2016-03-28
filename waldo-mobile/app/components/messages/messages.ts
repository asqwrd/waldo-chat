/**
 * Created by asqwrd on 3/2/2016.
 */

import {Component,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {AvatarInitial} from "../../libs/pipes";
import {Avatar} from "../../components/avatar/avatar";
import {ApiService} from "../../services/api-service";

import 'rxjs/Rx';


declare var PUBNUB:any;

@Component({
    selector: 'message',
    providers: [ApiService],
    templateUrl: 'build/components/messages/messages.html',
    pipes:[AvatarInitial],
    directives:[Avatar]
})



export class Message {

    pubnub: any;
    @Input() message: any;
    @Input() userId: any;
    @Input() access_token: any;
    user:Object;
    http:Http;
    domain:ApiService;


    constructor(http: Http,domain:ApiService) {
        //this.message = "";
        this.user ={};
        this.http = http;
        this.domain = domain;

    }

    ngOnInit(){

        if(this.userId) {
            this.http.get(this.domain.getApiDomain() + "/user/" + this.userId).map((responseData) => {
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


