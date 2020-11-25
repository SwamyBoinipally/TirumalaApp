import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ThemeAlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeAlertProvider {

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello ThemeAlertProvider Provider');
  }

  showAlert(alertTittle, alertSubTittle) {
  let alert = this.alertCtrl.create({
    title: alertTittle,
    subTitle: alertSubTittle.message,
    buttons: ['OK']
  });
  alert.present();
}

}
