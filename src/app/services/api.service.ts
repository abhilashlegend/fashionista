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

   get(path:string, id?:string){
    if(id == null){
      return this.http.get(this.baseurl + path);
    } else {
      return this.http.get(`${this.baseurl}${path}/${id}`);
    }
   }

   update(path:string, id:string, data:any){
    const url = `${this.baseurl}${path}/${id}`;
    return this.http.put(url, data);
   }

   delete(path:string, id:string){
    const url = `${this.baseurl}${path}/${id}`;
    return this.http.delete(url);
   }


}
