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
   this.bind();
  }

  editproduct(id:string) {

  }

  private bind() {
    this.api.get("product/list").subscribe((result:any) => {
      this.products = result.data;
    })
  }

  deleteproduct(id:string) {
    if(confirm("Are you sure you want to delete ?")){
      this.api.delete("product/delete", id).subscribe(() => { this.bind()}, error => {
        console.log(error);
      });
    }
  }

}
