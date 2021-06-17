import { AuthPage} from '../pages/auth/auth';
import { IntroPage } from './../pages/intro/intro';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../utils/api';
import { HttpModule } from '@angular/http';
import { HC_Storage } from '../utils/storage';

import { HttpClientModule, HttpClient } from '@angular/common/http';

let pages =[
  HomePage,
  IntroPage,
  AuthPage,
]
@NgModule({
  declarations: [
    MyApp,
    pages
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pages,
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    AuthProvider,
    StatusBar,
    HC_Storage,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
