import {App, Platform} from 'ionic-framework/ionic';
import {HomePage} from './pages/home/home';

declare var StatusBar:any;
declare var cordova:any;

@App({
  template: '<ion-nav [root]="root"></ion-nav><ion-overlay></ion-overlay>',
})
export class MyApp {
  constructor(platform: Platform) {
    this.platform = platform;
    this.initializeApp();
    this.root = HomePage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
    if (cordova.platformId == 'android') {
      StatusBar.backgroundColorByHexString("#00A8DA");
    }else{
      StatusBar.backgroundColorByHexString("#11c1f3");
    }
  });
  }
}