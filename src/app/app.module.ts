import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import {AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {FIREBASSE_CONFIG} from '../app/app.firebase.config';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ServicesPage } from '../pages/services/services';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { AddservicesPage } from '../pages/services/addservices/addservices';
import { SharedServiceProvider } from '../providers/shared-service/shared-service';
import { EditservicesPage } from '../pages/services/editservices/editservices';
import { UpdatesPage } from '../pages/updates/updates';
import { YoutubeProvider } from '../providers/youtube/youtube';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { PlaylistPage } from '../pages/updates/playlist/playlist';
// import { CallNumber } from '@ionic-native/call-number';
// import { EmailComposer } from '@ionic-native/email-composer';
import { GooglePlus } from '@ionic-native/google-plus';
import { CommonModule } from '@angular/common';
import { GoogleLoginComponent } from '../components/google-login/google-login';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    SignupPage,
    ServicesPage,
    AddservicesPage,
    AboutPage,
    ContactPage,
    EditservicesPage,
    UpdatesPage,
    PlaylistPage,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASSE_CONFIG),
    AngularFireAuthModule,
    ReactiveFormsModule,
    IonicImageViewerModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  
  ],
  exports: [GoogleLoginComponent],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    SignupPage,
    ServicesPage,
    AddservicesPage,
    AboutPage, 
    ContactPage,
    EditservicesPage,
    UpdatesPage,
    PlaylistPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedServiceProvider,
    YoutubeProvider,
    YoutubeVideoPlayer,
    GooglePlus
    // CallNumber
    
  ]
})
export class AppModule {}
