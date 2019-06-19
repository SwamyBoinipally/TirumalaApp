import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AddservicesPage } from './addservices/addservices';
import { EditservicesPage } from './editservices/editservices';
//import { AngularFireDatabase} from 'angularfire2/database';
 import { AddService } from '../../models/add-service.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
//import {Router} from '@angular/router';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
  // servicesList: any;
  itemList: AngularFireList<any>;
  itemArray: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private database: AngularFireDatabase, 
    private actionSheetCtrl: ActionSheetController, private toastCtrl: ToastController,) {
      //this.servicesList = this.database.list('services-list');
      //this.servicesList.subscribe(x => console.log(x));
      //console.log('this.servicesList',this.servicesList);

     
    }

    ngOnInit () {
      this.itemList = this.database.list('services-list')
      this.itemList.snapshotChanges()
      .subscribe(actions=>{
            actions.forEach(action=>{ 
              let y = action.payload.toJSON();
              // console.log('y',y);
              y["$key"] = action.key
              this.itemArray.push(y as AddService)
              console.log('this.itemArray:',this.itemArray);
              
    
  })
      })
    }

    doRefresh(refresher) {
      this.ngOnInit();
       this.itemArray = [];
      setTimeout(() => {
        refresher.complete();
      }, 500);
    }



    selectServiceItem (service: AddService) {
      console.log('service here:',service)
      let actionSheet = this.actionSheetCtrl.create({
        title: `${service.serviceName}`,
        buttons: [
          // {
          //   text: 'Edit',
          //   // role: 'destructive',
          //   handler: () => {
          //     this.navCtrl.push(EditservicesPage, {service: service});
          //     console.log('Destructive clicked');
          //   }
          // },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.database.object('/services-list/' + service.$key).remove();
              let toast = this.toastCtrl.create({
                message: 'Service Deleted!',
                duration: 2000,
                position: 'bottom',
                cssClass: 'dark-trans',
                showCloseButton: true,
                closeButtonText: 'X',
              });
              toast.present();
          }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
   
      actionSheet.present();
    }



  addServices() {
    this.navCtrl.push(AddservicesPage);
    //this.itemArray = []
    // let prompt = this.alertCtrl.create({
    //   title: 'Service Name',
    //   inputs: [
    //     {
    //       name: 'title',
    //       placeholder: 'Title'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         // const newSongRef = this.todosCollection.push({});
   
    //         // newSongRef.set({
    //         //   id: newSongRef.key
    //         //    title: data.title
    //         // });
    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  }

}
