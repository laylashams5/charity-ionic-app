import { Component } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AlertController, Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthProvider } from '../../utils/api';
import { HC_Storage } from '../../utils/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
   showlogin: boolean = true;
   showregister: boolean = false;
   data:any = {}
   res:any = {}
   email:any ={}
   loader:any = {};
   alert: any = {};
   password:any ={}
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http:Http,
    public events: Events,
    public api:AuthProvider,
    public storage:HC_Storage,
    public toast: ToastController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.email)
  }

  showLogin() {
    this.showlogin= true;
    this.showregister = false;
  }
  showRegister() {
    this.showlogin= false;
    this.showregister=true;
  }
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
  Login(data) {

    if(this.data.email == null || this.data.password== null){
      this.alert = this.alertCtrl.create({
        title: "خطأ",
        subTitle: "يجب ادخال الإيميل وكلمة المرور",
        buttons: [{
          text: 'نعم',
          role: 'الغاء',
          handler: () => {
          }
        }]
      });
      this.alert.present();
      return;
	  }
	  else
	  {
		this.loader = this.loadingCtrl.create({
			content: 'تسجيل الدخول'
		});
		this.loader.present();
      var headers = new Headers();
      headers.append("Accept","application/x-www-form-urlencoded")
      headers.append("Content-Type", "application/json");
      headers.append("apikey","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjAxNjY3OCwiZXhwIjoxOTM3NTkyNjc4fQ.aFpVcHVQa1uJFDobp6zE8JLCeWcWXY2sPY3fJK6p7as");
      headers.append("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjAxNjY3OCwiZXhwIjoxOTM3NTkyNjc4fQ.aFpVcHVQa1uJFDobp6zE8JLCeWcWXY2sPY3fJK6p7as");


      let body = {
        email: this.data.email,
        password: this.data.password
      };

      this.http.post('http://kvzmhwvwrscebplqugbn.supabase.co/auth/v1/token?grant_type=password', JSON.stringify(body), {
        headers:headers,
      })
        .map(res => res.json())
        .subscribe(data => {
          this.events.publish('user:login');
          this.loader.dismiss();
          if (data.error) {
            this.alert = this.alertCtrl.create({
              title: "خطأ",
              subTitle: "الإيميل أو كلمة المرور خطأ",
              buttons: [{
                text: 'نعم',
                role: 'الغاء',
                handler: () => {
                 this.loader.dismiss()
                }
              }]
            });

            this.alert.present();
          } else {
            this.showToast("تم تسجيل الدخول بنجاح"); 	
            console.log(data)
            this.storage.set('Token', data.access_token);					
            this.navCtrl.setRoot(HomePage);							
          }
        },
        (error:any) => {
        this.showToast("خطأ في الإيميل أو في كلمة المرور"); 
        this.loader.dismiss();
      
        });

	  }
  }

  LoginAsVistor() {

  }
  Back() {
    this.navCtrl.pop()
  }
}
