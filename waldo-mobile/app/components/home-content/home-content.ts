
/**
 * Created by asqwrd on 2/25/2016.
 */


import {Component} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx';
import {HeaderComponent} from '../../components/header/header';



@Component({
    selector: 'home-content',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/components/home-content/home-content.html',
    directives:[HeaderComponent]
})




export class HomeContent {
    profile:Object;
    http:Http;

    constructor(http: Http) {
        this.profile ={};
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

