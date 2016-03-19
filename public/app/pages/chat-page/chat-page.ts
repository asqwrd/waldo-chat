import {Component, View,Input,ElementRef,ViewChild} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import {Message} from '../../components/messages/messages';
import {HeaderComponent} from '../../components/header/header';
import {Avatar} from '../../components/avatar/avatar';
import {PerfectScrollDirective} from "../../directives/perfect-scroll/perfect-scroll";
import {EventService} from '../../services/event-service';

import 'rxjs/Rx';




declare var PUBNUB:any;
declare  var Ps:any;

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
    @ViewChild('messagelist') list:any;
    sending:Boolean;
    whotyping:string;

    constructor(http: Http, params: RouteParams) {
        this.params = params;
        this.http = http;
        this.messages = [];
        this.sending = false;
        this.whotyping = "";

        this.chatBox="";

        this.profile ={};
        this.http.get("/user").map( (responseData) => {
            var data = responseData.json();
            this.profile = data.profile;
            return this.profile;
        }).subscribe((success) => {
            var data = success;
            this.profile = data;
            this.pubnub = PUBNUB.init({
                publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
                subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe',
                uuid: this.profile[0].uid
            });
            this.pubnub.history({
                channel:this.params.get('chatId'),
                count : 100,
                callback : (m)=> {
                    this.messages = m[0];
                    setTimeout(() =>{
                        this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight + 106;
                        Ps.update(this.list.nativeElement);
                    },1000);
                }
            });

            this.pubnub.subscribe({
                channel : this.params.get('chatId'),
                presence:(text)=>{
                    if((text.uuid !== this.profile[0].uid) && (text.data && text.data.isTyping == true)){
                        this.whotyping = " " + text.data.full_name +" is typing";
                    }else{
                        this.whotyping = "";
                    }
                },
                callback : (text) =>{
                    this.messages.push(text);
                    this.sending = true;
                    this.pubnub.state({
                        channel: this.params.get('chatId'),
                        uuid: this.profile[0].uid,
                        state: {"full_name": this.profile[0].firstname, isTyping: false},
                        callback: function (m) {
                            //console.log(JSON.stringify(m))
                        }
                    });
                    setTimeout(() =>{
                        this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight + 106;
                        Ps.update(this.list.nativeElement);
                        this.sending=false;
                    },1000);
                }
            });
        }, (error) => {
            console.log(JSON.stringify(error));
        });


    }

    ngOnInit(){
        this.chatId = this.params.get('chatId');
    }

    ngAfterViewInit(){

    }

    typing(evt){
        if(this.chatBox.trim().length > 0) {
            this.pubnub.state({
                channel: this.params.get('chatId'),
                uuid: this.profile[0].uid,
                state: {"full_name": this.profile[0].firstname, isTyping: true},
                callback: function (m) {
                    //console.log(JSON.stringify(m))
                }
            });
        }else{
            this.pubnub.state({
                channel: this.params.get('chatId'),
                uuid: this.profile[0].uid,
                state: {"full_name": this.profile[0].firstname, isTyping: false},
                callback: function (m) {
                    //console.log(JSON.stringify(m))
                }
            });
        }
    }

    send(message,userId,container) {
        var messageObj = {
            channel:this.params.get('chatId'),
            presence:{isTypying:true},
            message: {text:message,userId:userId},
            callback : (m)=> {
                this.chatBox = "";
            }
        };

        if(message && message != "") {
            this.pubnub.publish(messageObj)
        }
        this.chatBox = "";

    }
}
