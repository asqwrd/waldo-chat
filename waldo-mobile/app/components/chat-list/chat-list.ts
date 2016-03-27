/**
 * Created by asqwrd on 2/24/2016.
 */

import {Component,Input,NgZone} from "angular2/core";
import {Page, NavController, NavParams} from 'ionic-angular';
import {Http, HTTP_PROVIDERS,Headers} from "angular2/http";
import {NgStyle,NgFor} from 'angular2/common';


import {LastMessage} from "../last-message/last-message";
import {Avatar} from "../avatar/avatar";
import {AvatarInitial,NameListPipe} from "../../libs/pipes";
import {ChatPage} from '../../pages/chat-page/chat-page';

declare var FB:any;
@Component({
    selector: 'chat-list',
    viewProviders: [HTTP_PROVIDERS],
    pipes:[AvatarInitial,NameListPipe],
    templateUrl: 'build/components/chat-list/chat-list.html',
    directives:[LastMessage,NgStyle,Avatar]
})


export class ChatList {
    @Input() chats:any;
    @Input() access_token:any;
    profile:Array<Object>;
    http:Http;
    params:NavParams;
    nav:NavController;
    zone:NgZone;


    constructor(http: Http,params:NavParams,nav:NavController,zone:NgZone) {
        this.chats =[];

        this.nav = nav;
        this.http = http;
        this.params = params;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.profile = this.params.get('profile');

    }

    ngOnInit(){
        console.log(this.chats);
    }

    startChat(chatId,chat){
        //this.router.navigate(['ChatPage',{chatId: chatId}]);
        this.nav.push(ChatPage, {
            chatId: chatId,
            profile:this.profile,
            access_token:this.access_token,
            chat:chat
        });
    }


}
