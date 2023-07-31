import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  products:any;
  baseurl!:string;
  subtotal:number = 0.0;
  delivery:number = 0.0;
  grandtotal:number = 0.0;

  constructor(private router:Router, private api: ApiService, private cartService: CartService){
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
    if(localStorage.getItem("usertype") === null){
      this.router.navigate(["/login"]);
    }
     this.bind();
  }


  bind() {
    this.products = JSON.parse(localStorage.getItem("products") || "[]");
    this.subtotal = 0.0;
    this.delivery = 0.0;
    this.grandtotal = 0.0;

    if(this.products.length == 0){
      this.router.navigate(['/']);
    } else {
      for(let i = 0; i < this.products.length; i++){
        this.subtotal += this.products[i].price * this.products[i].quantity;
      }
      this.grandtotal = this.subtotal + this.delivery;
    }
  }
}
