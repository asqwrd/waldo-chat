/**
 * Created by asqwrd on 2/24/2016.
 */

import {Component, View,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS,Headers} from "angular2/http";
import {NgStyle,NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig,RouterLink,Router} from 'angular2/router';

import 'rxjs/Rx';

import {LastMessage} from "../last-message/last-message";
import {Avatar} from "../avatar/avatar";
import {AvatarInitial,NameListPipe} from "../../libs/pipes";
import {PerfectScrollDirective} from "../../directives/perfect-scroll/perfect-scroll";


@Component({
    selector: 'chat-list',
    viewProviders: [HTTP_PROVIDERS],
})

@View({
    pipes:[AvatarInitial,NameListPipe],
    templateUrl: 'app/components/chat-list/chat-list.html',
    directives:[LastMessage,NgStyle,PerfectScrollDirective,Avatar]

})

export class ChatList {
    chats:Array<Object>;
    profile:Object;
    http:Http;
    router:Router;


    constructor(http: Http,router:Router) {
        this.chats =[];
        this.http = http;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.router = router;

        this.profile ={};
        this.http.get("/user").map( (responseData) => {
            var data = responseData.json();
            this.profile = data.profile;
            return data.profile;
        }).subscribe((success) => {
            var data = success;
            this.profile = data;
            this.http.get("/chats").map( (responseData) => {
                var data2 = responseData.json();
                return data2;
            }).subscribe((success) => {
                var data3 = success;
                this.chats = data3;
            }, (error) => {
                console.log(error);
            });
        }, (error) => {
            console.log(JSON.stringify(error));
            this.router.navigate(['Login']);

        });

    }

    startChat(chatId){
        this.router.navigate(['ChatPage',{chatId: chatId}]);
    }


}
