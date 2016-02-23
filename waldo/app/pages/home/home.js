import {Page} from 'ionic-framework/ionic';
import {Http} from "angular2/http";
import {NgZone} from "angular2/core";

declare var PUBNUB:any;


@Page({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    pubnub:any;
    constructor(http: Http) {
        this.messages = [];
        this.zone = new NgZone({enableLongStackTrace: false});
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe'
        });
        this.pubnub.history({
                channel : 'hello',
                count : 100,
                callback : (m)=> {console.log(m); this.messages = m[0]}
         });

        this.pubnub.subscribe({
                channel  : 'hello',
                callback : (text) =>{ this.messages.push(text) }
        });

        this.chatBox = "";

    }

    send(message) {

        var messageObj = {
            channel:'hello',
            message: message,
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