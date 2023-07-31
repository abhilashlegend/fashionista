import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories:any;
  @Input() cartcount = 0;
  isUserLoggedIn:boolean = false;
  username:string | null = "";

  constructor(private api: ApiService, private cartService: CartService, private route: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.api.get('productcategory/list').subscribe((result:any) => {
      this.categories = result.data;
    });

    this.cartService.cartCountEmitter.subscribe((count:number) => {
      this.cartcount = count;
    })

    this.userService.IsUserLoggedInEmitter.subscribe((isLoggedIn:boolean) => {
      this.isUserLoggedIn = isLoggedIn;
    });

    this.userService.UsernameEmitter.subscribe((name:string) => {
      this.username = name;
    })

     if(localStorage.getItem("products") != null){
      let products = JSON.parse(localStorage.getItem("products") || "[]");
      this.cartcount = products.length;
    }
    
    this.checkUser();
    
  }

  private checkUser() {
    if(localStorage.getItem("usertype") === "user"){
      this.userService.setUserLoggedIn(true);
      this.isUserLoggedIn = this.userService.getUserLoggedIn();
      this.username = localStorage.getItem("name");
    } 
  }

  logout() {
    this.userService.setUserLoggedIn(false);
    this.userService.setUsername("");
    localStorage.removeItem("email");
    localStorage.removeItem("usertype");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    this.route.navigate(["/"]);        
  }
}
