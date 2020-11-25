import { Injectable } from '@angular/core';


@Injectable()
export class SharedServiceProvider {

  constructor() { }

  // ngOnInit() {
  //   this.loadFiles();
  // }

  // loadFiles() {
  //   this.cloudFiles = [];

  //   const storageRef = firebase.storage().ref('files');
  //   storageRef.listAll().then(result => {
  //     result.items.forEach(async ref => {
  //       this.cloudFiles.push({
  //         name: ref.name,
  //         full: ref.fullPath,
  //         url: await ref.getDownloadURL(),
  //         ref: ref
  //       });
  //     });
  //   });
  // }

  // openExternal(url) {
  //   this.iab.create(url);
  // }

  // deleteFile(ref: firebase.storage.Reference) {
  //   ref.delete().then(() => {
  //     this.loadFiles();
  //   });
  // }

}
