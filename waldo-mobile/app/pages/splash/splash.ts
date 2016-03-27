/**
 * Created by asqwrd on 2/23/2016.
 */
import {Page, NavController, NavParams} from 'ionic-angular';
import {Component,NgZone} from "angular2/core";
import {Http, HTTP_PROVIDERS,Headers} from "angular2/http";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";

declare var openFB:any;

@Page({
    templateUrl: 'build/pages/splash/splash.html',
})


export class SplashPage {
    nav:NavController;
    http:Http;
    profile:Array<Object>;
    chats:Array<Object>;
    fb:any;
    zone:NgZone;

    constructor(nav:NavController,navParams:NavParams,http:Http,zone:NgZone) {
        this.nav = nav;
        this.http = http;
        this.profile = [];
        this.chats = [];
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.zone = zone;


        openFB.getLoginStatus((response) => {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token
                // and signed request each expire
                var uid = response.authResponse.userID;
                var access_token = response.authResponse.accessToken;
                openFB.api({
                    path: '/me',
                    success: (data) => {
                        var profile = {profile:data};
                        this.zone.run(()=>{
                            this.http.post('http://192.168.1.223:3000/login/facebook',JSON.stringify(profile),{headers:headers}).subscribe( (responseData) => {
                                this.profile = [responseData.json().profile];
                                this.http.get("http://192.168.1.223:3000/chats/" + this.profile[0].uid).subscribe( (responseData) => {
                                    var data2 = responseData.json();
                                    this.chats = data2;
                                    console.log(this.chats);
                                    this.nav.setRoot(HomePage, {
                                        profile: this.profile,
                                        chats:this.chats,
                                        access_token:access_token
                                    });
                                });
                            });
                        });
                    },
                    params: {
                       fields:["id", "birthday", "email", "first_name", "gender", "last_name","picture.type(large)","cover"]
                    },
                    error: (err)=>{

                        openFB.login((response) => {
                            if(response.status === 'connected') {


                            } else {
                                console.log('User cancelled login or did not fully authorize.');
                            }
                        }, {scope: ''});

                    }
                },{scope:''});

            }else{
                this.nav.setRoot(LoginPage);
            }
        });





    }


}

