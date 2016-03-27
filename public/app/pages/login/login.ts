/**
 * Created by asqwrd on 2/23/2016.
 */
import {Component, View} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import { ChatPage } from '../chat-page/chat-page';
import { HomeContent } from '../../components/home-content/home-content';

import 'rxjs/Rx';

declare var FB:any;
declare var window:any;
@Component({
    selector: 'login-page',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/pages/login/login.html'
})



export class LoginPage {
    http:Http;
    router:Router;
    profile:Object;
    constructor(http:Http,router:Router) {
        this.http = http;
        this.router = router;
        this.profile = {};

    }

    login(){
        FB.login((response) => {
            if (response.authResponse) {
                var access_token =   FB.getAuthResponse()['accessToken'];
                this.http.post('/auth/facebook/token?access_token='+access_token).subscribe((success) => {
                    var data = success.json();
                    console.log(data);
                    this.profile = data;
                    window.location = '/#/chat';
                });


            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: ''});



    }

}
