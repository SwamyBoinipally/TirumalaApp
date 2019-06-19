import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { CallNumber } from '@ionic-native/call-number';
// import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

call () {
  // this.callNumber.callNumber("18001010101", true)
  // .then(res => console.log('Launched dialer!', res))
  // .catch(err => console.log('Error launching dialer', err));
}

mail () {
  // this.emailComposer.isAvailable().then((available: boolean) =>{
  //   if(available) {
  //     //Now we know we can send
  //   }
  //  });
   
  //  let email = {
  //    to: '',
  //    cc: 'tirumalaphotography357@gmail.com',
  //    bcc: ['john@doe.com', 'jane@doe.com'],
  //   //  attachments: [
  //   //    'file://img/logo.png',
  //   //    'res://icon.png',
  //   //    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
  //   //    'file://README.pdf'
  //   //  ],
  //    subject: 'Tirumala Photography',
  //    body: 'Hello! Welcome to Tirumala Photography.',
  //    isHtml: true
  //  };
   
  //  // Send a text message using default options
  //  this.emailComposer.open(email);
}
}
