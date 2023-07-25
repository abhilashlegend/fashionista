import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:any;
  baseurl!:string;
  subtotal:number = 0.0;
  delivery:number = 0.0;
  grandtotal:number = 0.0;

  constructor(private router:Router, private api: ApiService, private cartService: CartService){
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
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

  deleteProduct(product:any) {
    if(confirm("Are you sure you want to delete ?")) {
      for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id === product.id && this.products[i].size === product.size  && this.products[i].color === product.color){
          this.products.splice(i, 1);
          //localStorage.removeItem(this.products[i]);
          
        }
      }
      console.log(this.products.length);
      localStorage.setItem("products", JSON.stringify(this.products));
      this.cartService.setCartCount(this.products.length);
      
    }    
  }

  qualityChanged(product:any, event:any) {
    const qty = <HTMLInputElement>(event.target);
    for(let i = 0; i < this.products.length; i++){
        if(this.products[i].id === product.id && this.products[i].size === product.size && this.products[i].color === product.color) {
          this.products[i].quantity = parseInt(qty.value)
        }
    }
    localStorage.setItem("products", JSON.stringify(this.products));
    this.bind();
  }

}
