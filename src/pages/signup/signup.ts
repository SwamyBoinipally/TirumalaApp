import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Nav, ToastController } from 'ionic-angular';
import { USER } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  registerForm: FormGroup;

  @ViewChild(Nav) nav: Nav;
  user = {} as USER;
  constructor(public navCtrl: NavController, public navParams: NavParams, private aFauth: AngularFireAuth, 
    private alertCtrl: AlertController, private loadCtrl:LoadingController, private formBuilder: FormBuilder,
    private toastCtrl: ToastController ) {
      this.registerForm = formBuilder.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: USER) {
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
      const result = await this.aFauth.auth.createUserWithEmailAndPassword(user.email, user.password)
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

}
