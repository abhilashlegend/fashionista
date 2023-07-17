import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any;
  baseurl:string;

  constructor(private api:ApiService) {
    this.baseurl = api.baseurl;
  }

  ngOnInit(): void {
    this.api.get("product/list").subscribe((result:any) => {
      this.products = result.data;
    })
  }

  editproduct(id:string) {

  }

  deleteproduct(id:string) {

  }

}
