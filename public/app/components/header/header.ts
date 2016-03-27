/**
 * Created by asqwrd on 2/26/2016.
 */


import {Component, View,Input,NgZone,Output,EventEmitter} from "angular2/core";
import {Http, HTTP_PROVIDERS,Headers} from "angular2/http";
import {NgStyle,NgFor} from 'angular2/common';
import 'rxjs/Rx';

import {LastMessage} from "../last-message/last-message";
import {Avatar} from "../avatar/avatar";
import {AvatarInitial,NameListPipe} from "../../libs/pipes";
import {EventService} from "../../services/event-service";


@Component({
    selector: 'header-component',
    viewProviders: [HTTP_PROVIDERS],
})

@View({
    pipes:[AvatarInitial,NameListPipe],
    templateUrl: 'app/components/header/header.html',
    directives:[LastMessage,NgStyle,Avatar],

})

export class HeaderComponent {
    profile: Object;
    @Input() chatid:string;
    http:Http;
    private open:any;
    chat:any;



    constructor(http: Http,private eventService:EventService) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.chat= {};
        this.profile ={};
        this.http = http;
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

        this.open = eventService.showOverlay();


        //eventService.emitter.subscribe(data => this.compose(data));
        this.eventService.emitter.subscribe((data) =>{
            this.open = data
        }, (error) => {
            console.log(JSON.stringify(error));
        });


    }

    ngOnInit(http:Http){
        this.chat= {};
        if(this.chatid) {
            this.http.get("/chat/" + this.chatid).map((responseData) => {
                var data = responseData.json();
                this.chat = data;
                return data;
            }).subscribe((success) => {
                var data = success;
                this.chat = data;


            });
        }
    }

    compose(){
        if(this.open ==false) {
            this.open = true;
        }else {
            this.open =false;
        }
        this.eventService.showCompose_broadcast( this.open);

    }






}

