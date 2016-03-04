/**
 * Created by asqwrd on 2/25/2016.
 */

import {Component, View} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {NgStyle,NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig,RouterLink,Router} from 'angular2/router';

import { ChatPage } from '../chat-page/chat-page';
import { HomeContent } from '../../components/home-content/home-content';
import { ChatList } from '../../components/chat-list/chat-list';
import {HeaderComponent} from '../../components/header/header';
import {SearchOverlay} from '../../components/search/search';
import {PerfectScrollDirective} from "../../directives/perfect-scroll/perfect-scroll";

import 'rxjs/Rx';




@Component({
    selector: 'home',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/pages/home/home.html',
    directives:[ChatList,NgStyle,NgFor,HeaderComponent,SearchOverlay,ROUTER_DIRECTIVES,PerfectScrollDirective]
})

@RouteConfig([
    { path: '/:chatId', as: 'ChatPage', component: ChatPage },
    { path: '/', as: 'HomeContent', component: HomeContent},

])

export class HomePage {
    profile:Object;
    http:Http;

    constructor(http: Http) {
        this.http = http;
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



}
