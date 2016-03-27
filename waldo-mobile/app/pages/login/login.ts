/**
 * Created by asqwrd on 2/23/2016.
 */
import {Page, NavController, NavParams} from 'ionic-angular';
import {Component,NgZone} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {HomePage} from "../home/home";
import {SplashPage} from "../splash/splash";

declare var openFB:any;

@Page({
    templateUrl: 'build/pages/login/login.html',
})


export class LoginPage {
    nav:NavController;
    http:Http;
    profile:Array<Object>;
    zone:NgZone;

    constructor(nav:NavController,navParams:NavParams,http:Http,zone:NgZone) {
        this.nav = nav;
        this.http = http;
        this.zone = zone;

    }

    login(event) {
        event.stopPropagation();
        this.zone.run(()=>{
            openFB.login((response) => {

                if (response.status === 'connected') {
                    console.log('hi');
                    setTimeout(()=>{
                        this.nav.setRoot(SplashPage, {
                            from_login: true,
                        });
                    },1000);


                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'public_profile'});
        });


    }

}
