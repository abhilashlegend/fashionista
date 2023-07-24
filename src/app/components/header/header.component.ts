import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories:any;
  @Input() cartcount = 0;

  constructor(private api: ApiService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.api.get('productcategory/list').subscribe((result:any) => {
      this.categories = result.data;
    });

    this.cartService.cartCountEmitter.subscribe((count:number) => {
      this.cartcount = count;
      console.log(this.cartcount);
    })

     if(localStorage.getItem("products") != null){
      let products = JSON.parse(localStorage.getItem("products") || "[]");
      this.cartcount = products.length;
      console.log(this.cartcount);
    } 
  }
}
