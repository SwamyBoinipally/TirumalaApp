import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {} from '../../assets/img/'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  images = [ '01.jpg', '02.jpg', '03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg','010.jpg'];

}
