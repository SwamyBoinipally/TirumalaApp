import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class SharedServiceProvider {
  userData: any;

  constructor(public http: HttpClient) {
    console.log('Hello SharedServiceProvider Provider');

  }



}
