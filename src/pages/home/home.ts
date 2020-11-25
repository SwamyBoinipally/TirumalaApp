import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
// import {} from '../../assets/img/'
import { HOME_PAGE_TEXT } from './../../app/utils/constants';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public home = HOME_PAGE_TEXT;

  constructor(private navCtrl: NavController, private navParams: NavParams,) {
    let profile = this.navParams.get('profile');
    console.log('navParams profile::',profile);
  }

  images = [ '01.jpg', '02.jpg', '03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg','010.jpg'];

}
