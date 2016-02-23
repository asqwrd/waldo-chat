import {Component, View} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";

declare var PUBNUB:any;

@Component({
    selector: 'default',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/default/default.html'
})

export class DefaultPage {

    messages: Array<String>;
    chatBox: String;
    pubnub: any;

    constructor(http: Http) {
        this.messages = [];
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
        this.chatBox="";
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
