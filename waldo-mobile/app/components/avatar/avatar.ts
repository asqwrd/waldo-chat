/**
 * Created by asqwrd on 3/3/2016.
 */
/**
 * Created by asqwrd on 3/2/2016.
 */

import {Component,Input} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {AvatarInitial} from "../../libs/pipes";

import 'rxjs/Rx';


declare var PUBNUB:any;

@Component({
    selector: 'avatar',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'build/components/avatar/avatar.html',
    pipes:[AvatarInitial],
    directives:[]
})


export class Avatar {

    @Input() profile: any;
    http:Http;


    constructor(http: Http) {
        //this.message = "";

    }

    ngOnInit(){
    }

    ngAfterViewInit(){

    }

    keys(array) : Array<any> {
        return Object.keys(array);
    }

}


