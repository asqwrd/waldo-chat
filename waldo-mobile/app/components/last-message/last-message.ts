/**
 * Created by asqwrd on 2/24/2016.
 */
import {Component,Input,NgZone} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx';
import {ApiService} from "../../services/api-service";


declare var PUBNUB:any;

@Component({
    selector: 'last-message',
    providers: [ApiService],
    templateUrl: 'build/components/last-message/last-message.html'

})



export class LastMessage {

    pubnub: any;
    @Input() chatId: any;
    @Input() userIds: any;
    lastMessage:string;
    lastUser:Object;
    http:Http;
    zone:NgZone;
    domain:ApiService;


    constructor(http: Http,zone:NgZone,domain:ApiService) {
        this.lastMessage = "";
        this.lastUser ={};
        this.http = http;
        this.zone = zone;
        this.domain = domain;

    }

    ngOnInit(){
        this.pubnub = PUBNUB.init({
            publish_key: 'pub-c-9f5e4e92-83b7-4065-af32-e8ba5d5126bb',
            subscribe_key: 'sub-c-90042980-d726-11e5-9796-02ee2ddab7fe'
        });

        this.pubnub.history({
            channel: this.chatId,
            count: 100,
            callback: (m)=> {
                if (m[0][m[0].length - 1]) {
                    this.lastMessage = m[0][m[0].length - 1].text;
                    this.http.get(this.domain.getApiDomain() + "/user/" + m[0][m[0].length - 1].userId).map((responseData) => {
                        var data2 = responseData.json();
                            this.lastUser = data2[0];
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
            callback : (text) =>{
                this.lastMessage = text.text;
                this.http.get(this.domain.getApiDomain() + "/user/" + text.userId).map((responseData) => {
                    var data2 = responseData.json();
                    this.lastUser = data2[0];
                    return data2;
                }).subscribe((success) => {
                    var data = success;
                    this.lastUser = data[0];
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }

}

