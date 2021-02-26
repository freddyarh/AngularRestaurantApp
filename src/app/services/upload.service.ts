import { Injectable } from '@angular/core';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url: string = global.url;

  constructor() { 
    this.url;
  }

  fileRequest( url:string, params:Array<string>, files:Array<File>, name:string ){
    return new Promise(( reslve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      for(let i = 0; i < files.length; i++ ){
        formData.append(name, files[i], files[i].name);

      }

      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            reslve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });

  }
}
