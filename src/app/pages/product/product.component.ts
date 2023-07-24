import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  id:any;
  product:any;
  baseurl:string;
  quantity:number = 1;
  size:string|number|undefined = undefined;
  color:string = "";
  price!:number;
  mrp!:number;
  message:string = "";
  @Output() cartcounter = new EventEmitter<number>();


  constructor(private api: ApiService, private route:ActivatedRoute, private cartService: CartService, private cd: ChangeDetectorRef) {
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.api.get("product/get/" + this.id).subscribe((result:any) => {
      this.product = result.data;
      this.mrp = this.product.mrp;
      this.price = this.product.price;
      console.log(this.product);
    })
  }

  increaseQuantity(){
    this.quantity++;
  }

  decreaseQuantity() {
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  addToCart() {
    let product = {
      id: this.id,
      quantity: this.quantity,
      color: this.color,
      size: this.size,
      mrp: this.mrp,
      price: this.price
    }

    let products = new Array();

    if(localStorage.getItem("products") != null){
      products = JSON.parse(localStorage.getItem("products") || "[]");
    }

    let added = false;  
    for(let i = 0; i < products.length; i++){
      if(products[i].id == product.id && products[i].color == product.color && products[i].size == product.size){
        alert("Product already added to cart");
        added = true;
      }
    }
    if(!added){
      products.push(product);
    }
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added to cart");
    this.cartService.setCartCount(products.length);
    this.cd.detectChanges();
    console.log(product);
  }

  checkPrice() {
    this.message = "";
    if(this.size !== undefined){
      
      for(let i = 0; i < this.product.varieties.length; i++){
        if(this.product.varieties[i].size == this.size){
          this.price = this.product.varieties[i].price;
          this.mrp = this.product.varieties[i].mrp;
          break;
        }
      }

    } 
    
  }
}
