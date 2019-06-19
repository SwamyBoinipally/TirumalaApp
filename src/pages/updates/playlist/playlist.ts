import { Component } from '@angular/core';
import { YoutubeProvider } from '../../../providers/youtube/youtube';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {

  videos:Array<any>;
 
  constructor(private navParams: NavParams, private ytProvider: YoutubeProvider, 
  private youtube: YoutubeVideoPlayer, private plt: Platform, public loadingCtrl: LoadingController) {
    console.log('let listId:::');
    let listId = this.navParams.get('id');
    console.log('let listId:::',listId);
    this.ytProvider.getListVideos(listId).subscribe(data => {
      this.videos = data;
      console.log('this.videos:::',this.videos);
    });
   
  }
 
  openVideo(video) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    loading.dismiss();
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
 
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }

}
