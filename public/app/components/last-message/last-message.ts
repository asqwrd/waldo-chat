/**
 * Created by asqwrd on 2/24/2016.
 */
import {Component, View,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx';


declare var PUBNUB:any;

@Component({
    selector: 'last-message',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/components/last-message/last-message.html'
})

export class LastMessage {

    pubnub: any;
    @Input() chatId: any;
    @Input() userIds: any;
    lastMessage:string;
    lastUser:Object;
    http:Http;


    constructor(http: Http) {
        this.lastMessage = "";
        this.lastUser ={};
        this.http = http;

    }

    ngOnInit(){
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe'
        });
        this.pubnub.history({
            channel : this.chatId,
            count : 100,
            callback : (m)=> {
                if(m[0][m[0].length - 1]) {
                    this.lastMessage = m[0][m[0].length - 1].text;

                    this.http.get("/user/" + m[0][m[0].length - 1].userId).map((responseData) => {
                        var data2 = responseData.json();
                        return data2;
                    }).subscribe((success) => {
                        var data = success;
                        this.lastUser = data[0];
                    }, (error) => {
                        console.log(error);
                    });
                }
            }
        });

        this.pubnub.subscribe({
            channel  : this.chatId,
            callback : (text) =>{ this.lastMessage = text.text }
        });
    }

}

