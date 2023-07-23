import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  id:any;
  product:any;
  baseurl:string;
  quantity:number = 0;
  size:string|number|undefined = undefined;
  color:string = "";
  price!:number;
  mrp!:number;
  message:string = "";


  constructor(private api: ApiService, private route:ActivatedRoute) {
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
    if(this.quantity > 0){
      this.quantity--;
    }
  }

  addToCart() {
    let product = {
      id: this.id,
      quantity: this.quantity,
      mrp: this.mrp,
      price: this.price
    }

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
