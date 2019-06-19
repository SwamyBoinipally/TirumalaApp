import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { PlaylistPage } from '../../pages/updates/playlist/playlist';

@IonicPage()
@Component({
  selector: 'page-updates',
  templateUrl: 'updates.html',
})
export class UpdatesPage {
  private channelId = 'UC2vLQBvhwv2t3Bz7xFzDSqQ'; // Devdactic Channel ID  UCZZPgUIorPao48a1tBYSDgg
                                          //UC2vLQBvhwv2t3Bz7xFzDSqQ  -Tirumala
  playlists:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private youtubeProvider:YoutubeProvider, private alertCtrl:AlertController, public loadingCtrl: LoadingController) {

      // this.youtubeProvider.getPlaylistsForChannel(this.channelId).subscribe(res =>{
      //   console.log("resss::::",res);
      // })
  }

  searchPlaylists() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
   this.youtubeProvider.getPlaylistsForChannel(this.channelId).subscribe(data => {
    this.playlists = data;
      console.log('playlists: ',  this.playlists);
      loading.dismiss();
    }, err => {
      console.log('error log here:::',err);
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Youtube Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  }
 
  openPlaylist(id) {
    this.navCtrl.push(PlaylistPage, {id: id});
  }

}
