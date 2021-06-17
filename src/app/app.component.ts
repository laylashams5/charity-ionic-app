import { HomePage } from './../pages/home/home';
import { IntroPage } from './../pages/intro/intro';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthPage } from '../pages/auth/auth';
import { HC_Storage } from '../utils/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user:any = this.storage.get('Token');
  
  rootPage: any = this.user==null ? IntroPage : HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public storage:HC_Storage,
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'الرئيسية', component: HomePage },
        ];
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  Logout(){
    this.storage.clear(); // clear all localStorage data including user
    this.nav.setRoot(AuthPage);
  }
}
