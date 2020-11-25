import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Nav, ToastController } from 'ionic-angular';
import { USER } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  registerForm: FormGroup;

  @ViewChild(Nav) nav: Nav;
  showPassword: Boolean = false;
  passToggleIcon = 'eye';
  signupform: FormGroup;
  userData = {"username": "", "email": "", "name": "","password": "" } as USER;

  constructor(public navCtrl: NavController, public navParams: NavParams, private aFauth: AngularFireAuth, 
    private alertCtrl: AlertController, private loadCtrl:LoadingController, private toastCtrl: ToastController, private storage: Storage ) {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.signupform = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  async register(userData: USER) {
    this.storage.set('registeredUser', userData);
    console.log('userdata;;;',userData);
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
      this.aFauth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then(data =>{
        console.log("Register Data:", data);
        loading.dismiss();

        this.navCtrl.setRoot(LoginPage);
        let toast = this.toastCtrl.create({
          message: 'You successfully register',
          duration: 5000,
          position: 'top'
        });
        toast.present();

      })
      .catch (err => {
        console.log("Register Data Error:", err);
        loading.dismiss();
        if (err.message =='Password should be at least 6 characters'){
          let alert = this.alertCtrl.create({
            title: 'Registration Failed',
            subTitle: 'Password should be at least 6 characters',
            buttons: ['OK']
          });
          alert.present();
        } else {
        let alert = this.alertCtrl.create({
          title: 'Registration Failed',
          subTitle: 'Please enter correct email & password (OR) You entered existed credentials',
          buttons: ['OK']
        });
        alert.present();
      }
      });

  }

  // go to login page
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passToggleIcon = this.passToggleIcon == 'eye' ? this.passToggleIcon = 'eye-off' : this.passToggleIcon = 'eye'
  }

}
