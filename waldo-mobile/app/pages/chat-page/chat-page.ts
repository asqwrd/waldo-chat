import {Page, NavController, NavParams} from 'ionic-angular';
import {} from 'ionic-native';
import {Component,Input,ElementRef,ViewChild} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Message} from '../../components/messages/messages';
import {HeaderComponent} from '../../components/header/header';
import {Avatar} from '../../components/avatar/avatar';
import {EventService} from '../../services/event-service';
import {NameListPipe} from '../../libs/pipes';

import 'rxjs/Rx';




declare var PUBNUB:any;

@Page({
    selector: 'chat-page',
    templateUrl: 'build/pages/chat-page/chat-page.html',
    directives:[Message,Avatar],
    pipes:[NameListPipe]
})



export class ChatPage {

    messages: Array<String>;
    chatBox: String;
    pubnub: any;
    profile:Object;
    http:Http;
    params:NavParams;
    chatId:string;
    @ViewChild('messagelist') list:any;
    sending:Boolean;
    whotyping:string;
    access_token:any;
    chat:Object;

    constructor(http: Http, params: NavParams) {
        this.params = params;
        this.http = http;
        this.messages = [];
        this.sending = false;
        this.whotyping = "";
        this.access_token = this.params.get('access_token');
        this.chat = this.params.get('chat');


        this.chatBox="";

        this.profile = this.params.get('profile');
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe',
            uuid: this.profile[0].uid
        });
        this.pubnub.history({
            channel:this.params.get('chatId'),
            count : 20,
            callback : (m)=> {
                this.messages = m[0];
                setTimeout(() =>{
                    this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
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
                    this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
                    this.sending=false;
                },1000);
            }
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
