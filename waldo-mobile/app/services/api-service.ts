/**
 * Created by asqwrd on 2/28/2016.
 */


import {Component,EventEmitter,Output} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";


export class ApiService {
    public api_domain: string;

    constructor() {
        this.api_domain = 'http://192.168.1.223:3000';
    }

    public getApiDomain(){
        return this.api_domain;
    }

    public setApiDomain(domain){
        this.api_domain = domain;
    }



}
