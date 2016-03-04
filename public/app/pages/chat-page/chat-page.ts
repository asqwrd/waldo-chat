import {Component, View} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import {Message} from '../../components/messages/messages';
import {HeaderComponent} from '../../components/header/header';
import {Avatar} from '../../components/avatar/avatar';
import {PerfectScrollDirective} from "../../directives/perfect-scroll/perfect-scroll";

import 'rxjs/Rx';




declare var PUBNUB:any;

@Component({
    selector: 'chat-page',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/pages/chat-page/chat-page.html',
    directives:[Message,HeaderComponent,PerfectScrollDirective,Avatar]
})

export class ChatPage {

    messages: Array<String>;
    chatBox: String;
    pubnub: any;
    profile:Object;
    http:Http;
    params:RouteParams;
    chatId:string;

    constructor(http: Http, params: RouteParams) {
        this.params = params;
        this.http = http;
        this.messages = [];
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe'
        });
        this.pubnub.history({
            channel:this.params.get('chatId'),
            count : 100,
            callback : (m)=> {this.messages = m[0];}
        });

        this.pubnub.subscribe({
            channel : this.params.get('chatId'),
            callback : (text) =>{this.messages.push(text) }
        });
        this.chatBox="";

        this.profile ={};
        this.http.get("/user").map( (responseData) => {
            var data = responseData.json();
            this.profile = data.profile;
            return data.profile;
        }).subscribe((success) => {
            var data = success;
            this.profile = data;
        }, (error) => {
            console.log(JSON.stringify(error));
        });
    }

    ngOnInit(){
        this.chatId = this.params.get('chatId');
    }

    send(message,userId) {
        var messageObj = {
            channel:this.params.get('chatId'),
            message: {text:message,userId:userId},
            callback : (m)=> {
                this.chatBox = "";
            }
        }

        if(message && message != "") {
            this.pubnub.publish(messageObj)
        }
        this.chatBox = "";
    }
}
