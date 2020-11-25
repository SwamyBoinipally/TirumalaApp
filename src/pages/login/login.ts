import { GOOGLE_CONFIG_DETAILS, LOGIN_PAGE_ALERT } from './../../app/utils/constants';
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
import { ThemeAlertProvider } from './../../providers/shared-service/theme-alert';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  googleUser: Observable<firebase.User>;
  showPassword: Boolean = false;
  passToggleIcon = 'eye';
  credential:any;

  loginForm: FormGroup;
  user = {} as USER;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private aFauth: AngularFireAuth, private alertCtrl: AlertController, private loadCtrl: LoadingController,
    private formBuilder: FormBuilder, private toastCtrl: ToastController, private events: Events,
    private afAuth: AngularFireAuth, private googlePlus: GooglePlus, private platform: Platform, private themeAlert: ThemeAlertProvider) {
      this.googleUser = this.afAuth.authState;

      this.loginForm = formBuilder.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }

// ************************************* Google Sign-in ******************************************************//


// googleLoginNew() {
//   return Observable.create(observer => {
//     return this.googlePlus.login({
//       'webClientId': '758111674996-s6jnu48bq0no0g8oncij50h7nkoh9k6n.apps.googleusercontent.com',
//       'offline': true
//     })
//     .then( res => {
//       console.log('Gmail login res:',res);
//       const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
//       firebase.auth().signInWithCredential(firecreds)
//       .then( success => {
//         console.log('Gmail login success:',success);
//         observer.next(success);
//       })
//       .catch(error => {
//         console.log('Gmail login error:',error);
//         observer.error(error);
//       });
//     });
//   })
// }

// signOut(){
//   firebase.auth().signOut().then(function() {
//     alert("logout successful");
//   }, function(error) {
//     console.log(error);
//   });
// }

// ===================================//

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.googlePlus.login(GOOGLE_CONFIG_DETAILS).then(res => {
        console.log('Google mobile login 1 res:', res);
        this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(response => {
          console.log('Google mobile login 2 res:', response);
          this.events.publish('profile:isLogin', response, { GoogleLogin: 'true' });  // TODO
          if (response) {
            this.navCtrl.setRoot(HomePage, { profile: res.additionalUserInfo.profile });
          }
        }, error => {
          console.log('Google mobile login error 2:', error);
        })
      }, error => {
        console.log('Google mobile login error 1:', error);
        if (error.code = "auth/missing-or-invalid-nonce") {
          this.themeAlert.showAlert(LOGIN_PAGE_ALERT.DUPLICATE_MSG, error);
          // let alert = this.alertCtrl.create({
          //   title: 'Duplicate credential',
          //   subTitle: error.message,
          //   buttons: ['OK']
          // });
          // alert.present();
        } else if (error.code = "auth/cancelled-popup-request") {
          this.themeAlert.showAlert(LOGIN_PAGE_ALERT.AUTH_CANCELLED_MSG, error);
        }
      })
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
        console.log('Google Web login res:::', res);
        this.events.publish('profile:isLogin', res.additionalUserInfo.profile, { GoogleLogin: 'true' });
        if (res.additionalUserInfo.profile) {
          let loading = this.loadCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
          setTimeout(() => {
            loading.dismiss();
          }, 1000);
          this.navCtrl.setRoot(HomePage, { profile: res.additionalUserInfo.profile });
        }
      }, error => {
        console.log('Google Web login error:', error);
        if (error.code = "auth/missing-or-invalid-nonce") {
          this.themeAlert.showAlert(LOGIN_PAGE_ALERT.DUPLICATE_MSG, error);
          // let alert = this.alertCtrl.create({
          //   title: 'Duplicate credential',
          //   subTitle: error.message,
          //   buttons: ['OK']
          // });
          // alert.present();
        } else if (error.code = "auth/cancelled-popup-request") {
          this.themeAlert.showAlert(LOGIN_PAGE_ALERT.AUTH_CANCELLED_MSG, error);
          // let alert = this.alertCtrl.create({
          //   title: 'Authentication cancelled',
          //   subTitle: error.message,
          //   buttons: ['OK']
          // });
          // alert.present();
        }
      });
    }
  }

/* async nativeGoogleLogin(): Promise<void> {
  console.log("welcoe to googlelogin ---1");
  try {

    const gplusUser = await this.googlePlus.login({
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
      this.credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log('credential here:::', this.credential);
      console.log('provider here:::', this.credential.additionalUserInfo.profile);
      this.events.publish('profile:isLogin', this.credential.additionalUserInfo.profile, {GoogleLogin:'true'});
      if (this.credential.additionalUserInfo.profile) {
        // let loading = this.loadCtrl.create({
        //   content: 'Please wait...'
        // });
        // loading.present();
        // setTimeout(() => {
        //   loading.dismiss();
        // }, 1000);
        this.navCtrl.setRoot(HomePage, { profile: this.credential.additionalUserInfo.profile });
      }

    } catch (err) {
      console.log('error here:', err);
      if (err.code = "auth/missing-or-invalid-nonce") {
        let alert = this.alertCtrl.create({
          title: 'Duplicate credential',
          subTitle: err.message,
          buttons: ['OK']
        });
        alert.present();
      } else if (err.code = "auth/cancelled-popup-request") {
        let alert = this.alertCtrl.create({
          title: 'Authentication cancelled',
          subTitle: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    }

  } */


// signOut() {
//   this.afAuth.auth.signOut();
//   if ( this.platform.is('cordova') ){
//     this.gplus.logout();
//   }
// }

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
      .then((res) =>{
        this.events.publish('profile:isLogin', res, {isDirectLogin: 'true'});
      // loading.dismiss();
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
  console.log("Error here:", err);
  if (err.code = "auth/network-request-failed") {
    let alert = this.alertCtrl.create({
      title: 'Network Error',
      subTitle: 'Please connect internet!',
      buttons: ['OK']
    });
    alert.present();
  }

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
        handler: res => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: res => {
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

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passToggleIcon = this.passToggleIcon == 'eye' ? this.passToggleIcon = 'eye-off' : this.passToggleIcon = 'eye'
  }

}
