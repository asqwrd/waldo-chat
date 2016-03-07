import {
    Component,
    View,
    provide
} from "angular2/core";

import {bootstrap} from "angular2/platform/browser";

import {
    RouteConfig,
    RouterLink,
    RouterOutlet,
    Route,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    Router
} from 'angular2/router';

import { ChatPage } from './pages/chat-page/chat-page';
import { LoginPage } from './pages/login/login';
import { SecurePage } from './pages/secure/secure';
import { HomePage } from './pages/home/home';
import { EventService } from './services/event-service';

@Component({
    selector: "my-app",
    templateUrl: "./app/app.html",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", as: "Login", component: LoginPage },
    { path: "/chat/...", as: "HomePage", component: HomePage },
    { path: "/register", as: "SecurePage", component: SecurePage },
])

class App {

    router: Router;
    location: Location;

    constructor(router: Router, location: Location) {
        this.router = router;
        this.location = location;

    }

    ngOnInit(){

    }

}

bootstrap(App, [EventService,ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
