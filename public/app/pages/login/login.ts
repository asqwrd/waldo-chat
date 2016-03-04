/**
 * Created by asqwrd on 2/23/2016.
 */
import {Component, View} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";


@Component({
    selector: 'login-page',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/pages/login/login.html'
})

export class LoginPage {

    constructor() {

    }

}
