import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController,Platform } from 'ionic-angular';
import { USER } from './../../models/user';
// import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  googleUser: Observable<firebase.User>;

  loginForm: FormGroup;
  user = {} as USER;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private aFauth: AngularFireAuth, private alertCtrl: AlertController, private loadCtrl: LoadingController, 
    private formBuilder: FormBuilder, private toastCtrl: ToastController, private events: Events,
    private afAuth: AngularFireAuth, private gplus: GooglePlus, private platform: Platform ) {
      this.googleUser = this.afAuth.authState;

      this.loginForm = formBuilder.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
      });
  }
  
// ************************************* Google Sign-in ******************************************************//

googleLogin() {
  if (this.platform.is('cordova')) {
    
    this.nativeGoogleLogin();
    
  } else {
    this.webGoogleLogin();
  }
}

async nativeGoogleLogin(): Promise<void> {
  console.log("welcoe to googlelogin ---1");
  try {

    const gplusUser = await this.gplus.login({
      'webClientId': '758111674996-s6jnu48bq0no0g8oncij50h7nkoh9k6n.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })
    console.log('gplusUser:::',gplusUser);
    return await this.afAuth.auth.signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)).then(response => {
        console.log('response::::', response);
      })

  } catch(err) {
    console.log(err)
  }
}

async webGoogleLogin(): Promise<void> {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log('credential here:::', credential);
    console.log('provider here:::', credential.additionalUserInfo.profile);


  } catch(err) {
    console.log('error here:', err);
  }

}


signOut() {
  this.afAuth.auth.signOut();
  if ( this.platform.is('cordova') ){
    this.gplus.logout();
  }
}

// *******************************************************************************************//

  async login(user: USER) {
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  
      await this.aFauth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((data) =>{
      this.events.publish('data', data);
      loading.dismiss();  
        this.navCtrl.setRoot(HomePage);
        let toast = this.toastCtrl.create({
          message: 'You Loggedin Successfully',
          duration: 3000,
          position: 'bottom',
          cssClass: 'dark-trans'
        });
        toast.present();
       
})
.catch(err => {
  if (err.code = "auth/network-request-failed"){
    let alert = this.alertCtrl.create({
      title: 'Network Error',
      subTitle: 'Please connect internet!',
      buttons: ['OK']
    });
  }
  console.log("Error here:", err);
    // loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Authentication Failed',
          subTitle: 'Please enter correct email/password',
          buttons: ['OK']
        });
        alert.present();
 
    
      
})
}

register(){
  // let loading = this.loadCtrl.create({
  //   content: 'Please wait...'
  // });
  // loading.present();
  // setTimeout(() => {
  //   loading.dismiss();
  // }, 10);
  
  this.navCtrl.push(SignupPage);
}


forgotPass() {
  let forgot = this.alertCtrl.create({
    title: 'Forgot Password?',
    message: "Enter you email address to send a reset link password.",
    inputs: [
      {
        name: 'email',
        placeholder: 'Email',
        type: 'email'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: data => {
          console.log('Send clicked');
          let toast = this.toastCtrl.create({
            message: 'Email was sended successfully',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        }
      }
    ]
  });
  forgot.present();
}

}
