import {Page, NavController, NavParams} from 'ionic-angular';

import {Http} from "angular2/http";
import {NgZone} from "angular2/core";
import {ChatList} from '../../components/chat-list/chat-list';
import {Avatar} from "../../components/avatar/avatar";


//declare var PUBNUB:any;

declare var FB:any;
@Page({
    templateUrl: 'build/pages/home/home.html',
    directives:[ChatList,Avatar]
})


export class HomePage {

    profile:Array<Object>;
    nav:NavController;
    http:Http;
    selectedItem:NavParams;
    chats:Array<Object>;
    zone:NgZone;
    access_token:any;

    constructor(nav:NavController,navParams:NavParams,http:Http,zone:NgZone) {
        this.nav = nav;
        this.zone = zone;
        this.http = http;
        this.selectedItem = navParams.get('item');
        //this.profile =[];
        //this.chats =  [];
        this.access_token = navParams.get('access_token');
        this.profile = navParams.get('profile');
        this.chats = navParams.get('chats');

        console.log(this.profile);

    }

}