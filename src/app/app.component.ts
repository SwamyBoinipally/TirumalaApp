import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ServicesPage } from '../pages/services/services';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { UpdatesPage } from '../pages/updates/updates';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  name: any;
  email: any;
  icon:string;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private events: Events, private alertCtrl: AlertController) {
    this.initializeApp();
    events.subscribe('data', (data) => {
      this.email= data.user.email;
      this.name = this.email.substring(0, this.email.lastIndexOf("@"));
      console.log('Welcome', name);
    });
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      { title: 'Services', component: ServicesPage},
      { title: 'Updates', component: UpdatesPage},
      { title: 'About', component: AboutPage},
      { title: 'Contact', component: ContactPage}
          
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    
    let alert = this.alertCtrl.create({
      title: 'Are you sure!!',
      message: 'Do you want logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.nav.setRoot(LoginPage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
