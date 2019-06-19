import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddService } from '../../../models/add-service.interface';
import { AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-addservices',
  templateUrl: 'addservices.html',
})
export class AddservicesPage {
  addServiceObj = {} as AddService;
  servicesList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, 
    private loadingCtrl: LoadingController) {
    this.servicesList = this.database.list('services-list');
  }

  addService(addServiceObj: AddService) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Please wait...'
    });
  
    loading.present();
     this.servicesList.push(addServiceObj);
    //this.servicesList.push({ content: addServiceObj});
    loading.dismiss();
    // setTimeout(() => {
    //   loading.dismiss();
    // }, 1000);  
    this.addServiceObj = {} as AddService;
    this.navCtrl.pop();
    console.log('addServiceObj', addServiceObj);
  }
}
