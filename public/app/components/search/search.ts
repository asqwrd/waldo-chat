/**
 * Created by asqwrd on 2/26/2016.
 */
import {Component, View,NgZone,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS,Headers} from "angular2/http";
import {NgStyle,NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig,RouterLink,Router} from 'angular2/router';

import { HomeContent } from '../../components/home-content/home-content';
import { ChatList } from '../../components/chat-list/chat-list';
import {HeaderComponent} from '../../components/header/header';
import {EventService} from '../../services/event-service';
import 'rxjs/Rx';
import {AvatarInitial,ValuesPipe,SearchArrayPipe} from "../../libs/pipes";
import {Avatar} from '../../components/avatar/avatar';
import {PerfectScrollDirective} from '../../directives/perfect-scroll/perfect-scroll';





@Component({
    selector: 'search',
    viewProviders: [HTTP_PROVIDERS],
})

@View({
    templateUrl: 'app/components/search/search.html',
    directives:[NgStyle,NgFor,Avatar,PerfectScrollDirective],
    pipes:[AvatarInitial,ValuesPipe,SearchArrayPipe]
})

export class SearchOverlay {
    users:Array<Object>;
    http:Http;
    selectedUsersId: Array<string>;
    selectedUsers: Array<Object>;
    private showCompose:any;
    eventService:EventService;
    router:Router;


    constructor(http: Http, eventService:EventService,router:Router) {
        this.users = [];
        this.router = router;
        this.eventService = eventService;
        this.showCompose = eventService.showOverlay();
        this.selectedUsersId = [];
        this.selectedUsers = [];
        this.http = http;
        this.http.get("/users").map( (responseData) => {
            var data = responseData.json();
            this.users = data.users;
            return data.users;
        }).subscribe((success) => {
            var data = success;
            this.users = data;
        }, (error) => {
            console.log(JSON.stringify(error));
        });

        this.eventService.emitter.subscribe((data) =>{
            this.showCompose = data
        }, (error) => {
            console.log(JSON.stringify(error));
        });




    }

    private composeToggle(){
        if(this.showCompose == true){
            this.showCompose = false;
        }else{
            this.showCompose = true;
        }
        this.eventService.showCompose_broadcast(this.showCompose);
    }

    ngOnInit() {

    }

    addToSelected(user,zone:NgZone){
        if(this.selectedUsersId.indexOf(user.uid)<0){
            this.selectedUsersId.push(user.uid);
            //this.zone.run(() => {
                this.selectedUsers[user.uid] = user;
            //});

            user.selected = true;
        }else{
            var i = this.selectedUsersId.indexOf(user.uid);
            this.selectedUsersId.splice(i, 1);

            delete this.selectedUsers[user.uid];
            user.selected = false;
        }

    }
    createChatRoom(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.composeToggle();

        var data = {"users": this.selectedUsersId};
        this.http.post("/chats",JSON.stringify(data),{headers:headers}).subscribe( (responseData) => {
            var data = responseData.json();
            this.router.navigate(['ChatPage',{chatId: data.id}]);
            this.selectedUsersId = [];
            this.selectedUsers = [];
            this.users.forEach((user,index)=>{
               if(user.selected){
                   user.selected = false;
               }
            });
            //return data.users;
        })
    }



}
