import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddService } from '../../../models/add-service.interface';
import { AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-editservices',
  templateUrl: 'editservices.html',
})
export class EditservicesPage {
  serviceObj = {} as AddService;
  // addServiceObj = {} as AddService;
   updatedServiceObj = {} as AddService;
  servicesList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, 
    private loadingCtrl: LoadingController) {
    this.servicesList = this.database.list('services-list');
    
    // this.matatuRef$ = this.database.object(`matatu-list/`+ this.serviceObj);    
    this.serviceObj = navParams.get('service');
    console.log('this.servicesList', this.serviceObj);
  }


  updateService (serviceObj: AddService) {
    console.log('serviceObj:::', serviceObj);
    // let loading = this.loadingCtrl.create({
    //   spinner: 'hide',
    //   content: 'Please wait...'
    // });
    // loading.present();
    this.database.object('/services-list/' + serviceObj.$key)
    .update({ content: serviceObj });  
    //loading.dismiss();
    // setTimeout(() => {
    //   loading.dismiss();
    // }, 1000);  
    // this.updatedServiceObj = {} as AddService;
    this.navCtrl.pop();
 
  
    
  }

}
