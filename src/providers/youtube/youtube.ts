import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class YoutubeProvider {
  apiKey = 'AIzaSyAgzYgqfpAvoEoduVHbdTRjqV0dC0Cwl-E';

  constructor(public http: HttpClient) {

  }
 
  getPlaylistsForChannel(channel) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
    .map(response => response['items']);
    //.subscribe(response => console.log(response));
    // .map(res => res.josn());
    // .map((response: Response) => response.json())
    // .map(res => (<Response>res).json());
    //.map((res: Response) => res.json())
    // .map((res) => {
    //   return res.json()['items'];
    // })

  }
 
  getListVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .map(response => response['items']);
    // .map(response => console.log("response:::service", response) );
    //  .map(res => res.josn());
  // .map(response => console.log("response:::service", response));
  //.map(res => (<Response>res).json());
  //.map((res: Response) => res.json())
  
    // .map((res) => {
    //   return res.json()['items'];
    // })
  }


}
