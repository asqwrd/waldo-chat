import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {SplashPage} from './pages/splash/splash';
import {ApiService} from './services/api-service'


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  //providers: [ApiService],
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = SplashPage;


  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });


  }
}
