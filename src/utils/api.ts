import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthProvider {
  private data: any = {};

  private opt: RequestOptions;
  private apiUrl: string = 'https://kvzmhwvwrscebplqugbn.supabase.co/auth/';
  constructor(public http: Http) {}

  getData(endpoint: string,) {
    const fullUrl: string = this.apiUrl + endpoint;
    return  this.http.get(fullUrl).map(res => res.json());
  }

  postData(endpoint: string, data, headers) {
    const fullUrl: string = this.apiUrl + endpoint;
    return this.http.post(fullUrl,
      data, this.opt).map(res=>res.json());
  }
  public handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log('Server Error!');
    return Observable.throw(errMsg);
  }


}
