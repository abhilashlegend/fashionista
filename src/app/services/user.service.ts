import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  IsUserLoggedIn:boolean = false;
  username:string = "";
  IsUserLoggedInEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  UsernameEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  getUserLoggedIn():boolean {
    return this.IsUserLoggedIn;
  }

  getUsername():string {
    return this.username;
  }

  setUserLoggedIn(loggedIn:boolean) {
    this.IsUserLoggedIn = loggedIn;
    this.IsUserLoggedInEmitter.emit(this.IsUserLoggedIn);
  }

  setUsername(name:string){
    this.username = name;
    this.UsernameEmitter.emit(this.username);
  }

}
