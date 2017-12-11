import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
    rootPage:any = TabsPage;
    // nama:any;
    // iduser:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public app: App) {
    platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
        // this.checkPreviousAuthorization();
  }

  // hideSplashScreen() {
  //    if (Splashscreen) {
  //      setTimeout(() => {
  //        Splashscreen.hide();
  //      }, 20);
  //    }
  // }

  // logout() {
  //   window.localStorage.removeItem('iduser');
  //   window.localStorage.removeItem('nama');
  //   this.app.getRootNav().setRoot(LoginPage);
  // }

  // checkPreviousAuthorization() {
  // this.nama=window.localStorage.getItem('nama');
  //   this.iduser=window.localStorage.getItem('iduser');
  // if (window.localStorage.getItem('iduser') === null) {
  //   this.rootPage = LoginPage;
  // } else if (window.localStorage.getItem('nama') != '') {
  //   this.rootPage = HomePage;
  // }
  // }
}
