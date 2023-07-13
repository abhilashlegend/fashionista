import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl:string = "http://localhost:8080/";


  constructor(private http: HttpClient) {

   }

   post(path:string, data:any){
    const headers = {'Content-type':'application/json'};
    const body = JSON.stringify(data);
    return this.http.post(this.baseurl + path, body, {'headers': headers});
   }

   get(path:string){
    return this.http.get(this.baseurl + path);
   }
}
