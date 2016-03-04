/**
 * Created by asqwrd on 2/23/2016.
 */
import {Component, View} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";


@Component({
    selector: 'secure',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/pages/secure/secure.html'
})

export class SecurePage {
    profile:any;

    constructor(http: Http) {
        this.profile ={};
        http.get("/user").subscribe((success) => {
            var data = success.json();
                this.profile = data.profile;
                console.log(this.profile);
        }, (error) => {
            console.log(JSON.stringify(error));
        });

    }

}
